// React JSX namespace is provided by @types/react; ensure React namespace exists for React.ReactNode usage
import 'react';

interface ImportMetaEnv {
	readonly PROD?: boolean;
}

interface ImportMeta {
	readonly env?: ImportMetaEnv & Record<string, any>;
	// react-router dev serves via Vite-like glob import; type it loosely
	readonly glob?: (pattern: string) => Record<string, { default: any } | { [k: string]: any }>;
	readonly hot?: {
		on: (event: string, cb: (...args: any[]) => void) => void;
		off?: (event: string, cb: (...args: any[]) => void) => void;
	};
}
