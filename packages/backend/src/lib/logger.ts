type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: any;
}

function formatLog(payload: LogPayload): string {
  const meta = payload.context ? ` | context=${JSON.stringify(payload.context)}` : '';
  const err = payload.error ? ` | error=${payload.error?.stack || payload.error}` : '';
  return `[${payload.timestamp}] [${payload.level}] ${payload.message}${meta}${err}`;
}

export const logger = {
  info(message: string, context?: Record<string, any>) {
    console.log(formatLog({ level: 'INFO', message, timestamp: new Date().toISOString(), context }));
  },
  warn(message: string, context?: Record<string, any>) {
    console.warn(formatLog({ level: 'WARN', message, timestamp: new Date().toISOString(), context }));
  },
  error(message: string, error?: any, context?: Record<string, any>) {
    console.error(formatLog({ level: 'ERROR', message, timestamp: new Date().toISOString(), error, context }));
  },
  debug(message: string, context?: Record<string, any>) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatLog({ level: 'DEBUG', message, timestamp: new Date().toISOString(), context }));
    }
  },
};
