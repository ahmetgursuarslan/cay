// GPT5-AUTO-FIX: Global crash sniffer to surface silent errors
export function installCrashSniffer() {
  const log = (...a: any[]) => console.error('[CrashSniffer]', ...a);
  const globalAny: any = globalThis as any;
  if (globalAny.__CRASH_SNIFFER__) return;
  globalAny.__CRASH_SNIFFER__ = true;
  try {
    const prev = globalAny?.ErrorUtils?.getGlobalHandler?.() || null;
    globalAny?.ErrorUtils?.setGlobalHandler?.((e: any, isFatal?: boolean) => {
      log(e?.stack || e, { isFatal });
      prev && prev(e, isFatal);
    });
  } catch {}
  if (typeof (globalAny as any).addEventListener === 'function') {
    try {
      (globalAny as any).addEventListener('unhandledrejection', (e: any) => {
        log('UnhandledPromiseRejection', e?.reason || e);
      });
    } catch {}
  }
}
