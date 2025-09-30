import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Ionicons } from '@expo/vector-icons';
import { Stack, useGlobalSearchParams, useRouter, useSitemap, } from 'expo-router';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorBoundaryWrapper } from '../../__create/SharedErrorBoundary';
function NotFoundScreen() {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const expoSitemap = useSitemap();
    const [sitemap, setSitemap] = useState(expoSitemap);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
            const handler = (event) => {
                if (event.data.type === 'sandbox:sitemap') {
                    window.removeEventListener('message', handler);
                    setSitemap(event.data.sitemap);
                }
            };
            window.parent.postMessage({
                type: 'sandbox:sitemap',
            }, '*');
            window.addEventListener('message', handler);
            return () => {
                window.removeEventListener('message', handler);
            };
        }
    }, []);
    const isExpoSitemap = sitemap === expoSitemap;
    const missingPath = params['not-found']?.[0] || '';
    const availableRoutes = useMemo(() => {
        return (expoSitemap?.children?.filter((child) => child.href &&
            child.contextKey !== './auth.jsx' &&
            child.contextKey !== './auth.web.jsx' &&
            child.contextKey !== './+not-found.tsx' &&
            child.contextKey !== 'expo-router/build/views/Sitemap.js') || []);
    }, [expoSitemap]);
    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        }
        else {
            const hasTabsIndex = expoSitemap?.children?.some((child) => child.contextKey === './(tabs)/_layout.jsx' &&
                child.children.some((child) => child.contextKey === './(tabs)/index.jsx'));
            if (isExpoSitemap) {
                if (hasTabsIndex) {
                    router.replace('../(tabs)/index.jsx');
                }
                else {
                    router.replace('../');
                }
            }
            else {
                router.replace('..');
            }
        }
    };
    const handleNavigate = (url) => {
        try {
            if (url) {
                router.push(url);
            }
        }
        catch (error) {
            console.error('Navigation error:', error);
        }
    };
    const handleCreatePage = useCallback(() => {
        if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'sandbox:web:create',
                path: missingPath,
                view: 'mobile',
            }, '*');
        }
    }, [missingPath]);
    return (_jsxs(_Fragment, { children: [_jsx(Stack.Screen, { options: { title: 'Page Not Found', headerShown: false } }), _jsx(SafeAreaView, { style: styles.safeArea, children: _jsxs(ScrollView, { style: styles.container, contentContainerStyle: styles.contentContainer, children: [_jsxs(View, { style: styles.header, children: [_jsx(TouchableOpacity, { onPress: handleBack, style: styles.backButton, children: _jsx(Ionicons, { name: "arrow-back", size: 18, color: "#666" }) }), _jsxs(View, { style: styles.pathContainer, children: [_jsx(View, { style: styles.pathPrefix, children: _jsx(Text, { style: styles.pathPrefixText, children: "/" }) }), _jsx(View, { style: styles.pathContent, children: _jsx(Text, { style: styles.pathText, numberOfLines: 1, children: missingPath }) })] })] }), _jsxs(View, { style: styles.mainContent, children: [_jsx(Text, { style: styles.title, children: "Uh-oh! This screen doesn't exist (yet)." }), _jsxs(Text, { style: styles.subtitle, children: ["Looks like \"", _jsxs(Text, { style: styles.boldText, children: ["/", missingPath] }), "\" isn't part of your project. But no worries, you've got options!"] }), typeof window !== 'undefined' && window.parent && window.parent !== window && (_jsx(View, { style: styles.createPageContainer, children: _jsxs(View, { style: styles.createPageContent, children: [_jsxs(View, { style: styles.createPageTextContainer, children: [_jsx(Text, { style: styles.createPageTitle, children: "Build it from scratch" }), _jsxs(Text, { style: styles.createPageDescription, children: ["Create a new screen to live at \"/", missingPath, "\""] })] }), _jsx(View, { style: styles.createPageButtonContainer, children: _jsx(TouchableOpacity, { onPress: () => handleCreatePage(), style: styles.createPageButton, children: _jsx(Text, { style: styles.createPageButtonText, children: "Create Screen" }) }) })] }) })), _jsx(Text, { style: styles.routesLabel, children: "Check out all your project's routes here \u2193" }), !isExpoSitemap && sitemap ? (_jsx(View, { style: styles.pagesContainer, children: _jsxs(View, { style: styles.pagesListContainer, children: [_jsx(Text, { style: styles.pagesLabel, children: "MOBILE" }), (sitemap.expoPages || []).map((route, index) => (_jsx(TouchableOpacity, { onPress: () => handleNavigate(route.cleanRoute || ''), style: styles.pageButton, children: _jsx(Text, { style: styles.routeName, children: route.name }) }, route.id)))] }) })) : (_jsx(View, { style: styles.pagesContainer, children: _jsxs(View, { style: styles.pagesListContainer, children: [_jsx(Text, { style: styles.pagesLabel, children: "MOBILE" }), availableRoutes.map((route, index) => {
                                                const url = typeof route.href === 'string' ? route.href : route.href?.pathname || '/';
                                                if (url === '/(tabs)' && route.children) {
                                                    return route.children.map((childRoute) => {
                                                        const childUrl = typeof childRoute.href === 'string'
                                                            ? childRoute.href
                                                            : childRoute.href.pathname || '/';
                                                        const displayPath = childUrl === '/(tabs)'
                                                            ? 'Homepage'
                                                            : childUrl.replace(/^\//, '').replace(/^\(tabs\)\//, '');
                                                        return (_jsx(TouchableOpacity, { onPress: () => handleNavigate(childUrl), style: styles.pageButton, children: _jsx(Text, { style: styles.routeName, children: displayPath }) }, childRoute.contextKey));
                                                    });
                                                }
                                                const displayPath = url === '/' ? 'Homepage' : url.replace(/^\//, '');
                                                return (_jsx(TouchableOpacity, { onPress: () => handleNavigate(url), style: styles.pageButton, children: _jsx(Text, { style: styles.routeName, children: displayPath }) }, route.contextKey));
                                            })] }) }))] })] }) })] }));
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pathContainer: {
        flexDirection: 'row',
        height: 32,
        width: 300,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
    },
    pathPrefix: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e5e5e5',
    },
    pathPrefixText: {
        color: '#666',
    },
    pathContent: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    pathText: {
        color: '#666',
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '500',
        color: '#111',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        paddingTop: 16,
        paddingBottom: 48,
        color: '#666',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
    },
    boldText: {
        fontWeight: 'bold',
    },
    routesLabel: {
        color: '#666',
        marginBottom: 80,
        textAlign: 'center',
    },
    createPageContainer: {
        width: '100%',
        maxWidth: 800,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    createPageContent: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 8,
        padding: 20,
        backgroundColor: '#fff',
        gap: 15,
    },
    createPageTextContainer: {
        gap: 10,
    },
    createPageTitle: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
        textAlign: 'center',
    },
    createPageDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    createPageButtonContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    createPageButton: {
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    createPageButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    pagesContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    pagesLabel: {
        fontSize: 14,
        color: '#ccc',
        alignSelf: 'flex-start',
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    pagesListContainer: {
        width: '100%',
        maxWidth: 600,
        gap: 10,
    },
    pageButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        elevation: 1,
    },
    routeName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111',
    },
    routePath: {
        fontSize: 14,
        color: '#999',
    },
    routesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 40,
    },
    routeCard: {
        width: '100%',
        maxWidth: 300,
        minWidth: 150,
        alignItems: 'center',
        marginBottom: 12,
    },
    routeButton: {
        width: '100%',
        aspectRatio: 1.4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        overflow: 'hidden',
    },
    routePreview: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    routeLabel: {
        paddingTop: 12,
        color: '#666',
        textAlign: 'left',
        width: '100%',
    },
});
export default () => {
    return (_jsx(ErrorBoundaryWrapper, { children: _jsx(NotFoundScreen, {}) }));
};
