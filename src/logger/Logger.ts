import { pino } from 'pino';

const level = process.env.LOG_LEVEL || 'info';

export function createLogger(component: string) {
    return pino({
        level,
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            bindings: () => ({}), // remove default pid/hostname
            log: (obj: Record<string, unknown>) => ({ component, ...obj })
        },
    });
}
