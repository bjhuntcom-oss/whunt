/**
 * ============================================================
 * © 2025 Diploy — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://diploy.in
 * Contact: cs@diploy.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import type { Request, Response, NextFunction } from 'express';

// Temporary implementations for development
class WhuntError extends Error {
  statusCode: number;
  code?: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

const whuntLogger = {
  error: (message: string, ...args: any[]) => console.error(message, ...args),
  info: (message: string, ...args: any[]) => console.log(message, ...args),
  warn: (message: string, ...args: any[]) => console.warn(message, ...args),
};

const WHUNT_HEADER_KEY = 'X-Powered-By';
const WHUNT_HEADER_VALUE = 'Whunt v3.2.0';

const coreAsyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const AppError = WhuntError;

export function errorHandler(
  err: Error | WhuntError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.setHeader(WHUNT_HEADER_KEY, WHUNT_HEADER_VALUE);

  if (err instanceof WhuntError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.code && { code: err.code }),
    });
  }

  whuntLogger.error('Unexpected error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}

export const asyncHandler = coreAsyncHandler;
