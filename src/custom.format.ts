import * as colorette from 'colorette';
import { format } from 'winston';

export const createCustomFormat = (baseAt: string) =>
  format.printf(info => {
    const { level, message, timestamp, label } = info;
    const labelStr = label && label?.trim()?.length > 0 ? `[${label}]` : '';
    const levelUpperCase = level.toUpperCase();
    let levelStr = levelUpperCase;
    if (colorette.isColorSupported) {
      levelStr =
        level === 'info'
          ? colorette.green(levelStr)
          : level === 'error'
          ? colorette.red(levelStr)
          : level === 'warn'
          ? colorette.yellow(levelStr)
          : level === 'debug'
          ? colorette.cyan(levelStr)
          : levelStr;
    }
    const at = info.at ? info.at : '';
    const atStr =
      at === baseAt ? at : `${baseAt}${baseAt.length > 0 ? '.' : ''}${at}`;

    return `[${timestamp}]${labelStr}[${levelStr}][@${atStr}]: ${message}`;
  });
