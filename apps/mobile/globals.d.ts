declare module '__create/report-error-to-remote' {
  export function reportErrorToRemote(arg: { error: unknown }): Promise<{ success: boolean; error?: unknown }>;
}
