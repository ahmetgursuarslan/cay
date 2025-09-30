import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { isErrorLike, serializeError } from 'serialize-error';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
export function SharedErrorBoundary({ isOpen, children, description, }) {
    const animation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
    const [contentHeight, setContentHeight] = useState(0);
    useEffect(() => {
        Animated.timing(animation, {
            toValue: isOpen ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [isOpen, animation]);
    const translateY = animation.interpolate({
        inputRange: [0, 1],
        // fallback 100 if height not measured yet so it starts off-screen
        outputRange: [Math.max(contentHeight + 34, 100), 0],
    });
    const opacity = animation;
    return (_jsx(Animated.View, { pointerEvents: isOpen ? 'auto' : 'none', style: {
            position: 'absolute',
            bottom: 34,
            transform: [
                {
                    translateY,
                },
            ],
            zIndex: 50,
            alignItems: 'center',
            justifyContent: 'center',
            left: '5%',
            width: '90%',
        }, children: _jsx(View, { onLayout: (e) => setContentHeight(e.nativeEvent.layout.height), style: {
                backgroundColor: '#18191B',
                borderRadius: 8,
                padding: 16,
                maxWidth: 448,
                width: '100%',
                marginHorizontal: 16,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            }, children: _jsxs(View, { style: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' }, children: [_jsx(View, { style: { flexShrink: 0 }, children: _jsx(View, { style: {
                                width: 32,
                                height: 32,
                                backgroundColor: '#F2F2F2',
                                borderRadius: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: _jsx(Text, { style: { color: '#000', fontSize: 18, lineHeight: 18 }, children: "\u26A0" }) }) }), _jsxs(View, { style: { flex: 1, gap: 8 }, children: [_jsxs(View, { style: { gap: 4 }, children: [_jsx(Text, { style: { color: '#F2F2F2', fontSize: 14, fontWeight: '300' }, children: "App Error Detected" }), _jsx(Text, { style: { color: '#959697', fontSize: 14, fontWeight: '300' }, children: description ?? 'It looks like an error occurred while trying to use your app.' })] }), children] })] }) }) }));
}
export function Button({ color = 'primary', onPress = () => { }, children, }) {
    return (_jsx(View, { style: {
            backgroundColor: color === 'secondary' ? '#2C2D2F' : '#F9F9F9',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: color === 'secondary' ? '#414243' : '#C4C4C4',
            padding: 4,
            paddingHorizontal: 8,
        }, children: _jsx(Text, { style: { color: color === 'secondary' ? 'white' : '#18191B', fontSize: 14 }, onPress: onPress, children: children }) }));
}
function InternalErrorBoundary({ error: errorArg = null, }) {
    const [isOpen, setIsOpen] = useState(true);
    const handleShowLogsClick = useCallback(() => {
        window.parent.postMessage({
            type: 'sandbox:web:show-logs',
        }, '*');
    }, []);
    const handleFixClick = useCallback(() => {
        window.parent.postMessage({
            type: 'sandbox:web:fix',
            error: serializeError(errorArg),
        }, '*');
        setIsOpen(false);
    }, [errorArg]);
    const handleCopyError = useCallback(() => {
        const serializedError = serializeError(errorArg);
        const text = isErrorLike(serializedError)
            ? `${serializedError.message}\n\n${serializedError.stack}`
            : JSON.stringify(serializedError, null, 2);
        navigator.clipboard.writeText(text);
        setIsOpen(false);
    }, [errorArg]);
    function isInIframe() {
        try {
            return window.parent !== window;
        }
        catch {
            return true;
        }
    }
    return (_jsx(SharedErrorBoundary, { isOpen: isOpen, children: _jsx(View, { style: { flexDirection: 'row', gap: 8 }, children: isInIframe() ? (_jsxs(_Fragment, { children: [_jsx(Button, { color: "primary", onPress: handleFixClick, children: "Try to fix" }), _jsx(Button, { color: "secondary", onPress: handleShowLogsClick, children: "Show logs" })] })) : (_jsx(Button, { color: "primary", onPress: handleCopyError, children: "Copy error" })) }) }));
}
export class ErrorBoundaryWrapper extends React.Component {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.warn(error, info);
    }
    render() {
        if (this.state.hasError) {
            return _jsx(InternalErrorBoundary, { error: this.state.error });
        }
        return this.props.children;
    }
}
