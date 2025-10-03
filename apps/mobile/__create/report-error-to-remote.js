const { serializeError } = require('serialize-error');

const reportErrorToRemote = async ({ error }) => {
  // Do not attempt remote reporting in development to avoid noisy logs and unnecessary network calls.
  if (process.env.NODE_ENV !== 'production') {
    return { success: false };
  }

  // If required public env vars are not present, no-op silently.
  if (
    !process.env.EXPO_PUBLIC_LOGS_ENDPOINT ||
    !process.env.EXPO_PUBLIC_PROJECT_GROUP_ID ||
    !process.env.EXPO_PUBLIC_CREATE_TEMP_API_KEY
  ) {
    return { success: false };
  }

  try {
    await fetch(process.env.EXPO_PUBLIC_LOGS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_CREATE_TEMP_API_KEY}`,
      },
      body: JSON.stringify({
        projectGroupId: process.env.EXPO_PUBLIC_PROJECT_GROUP_ID,
        logs: [
          {
            message: JSON.stringify(serializeError(error)),
            timestamp: new Date().toISOString(),
            level: 'error',
          },
        ],
      }),
    });
  } catch (fetchError) {
    return { success: false, error: fetchError };
  }
  return { success: true };
};

module.exports = { reportErrorToRemote };
