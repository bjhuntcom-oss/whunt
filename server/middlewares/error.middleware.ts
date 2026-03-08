/**
 * ============================================================
 * © 2025 Whunt — WhatsApp Marketing Platform
 * Original Author: BTPL Engineering Team
 * Website: https://whunt.io
 * Contact: support@whunt.io
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
import { WhuntError, whuntLogger, WHUNT_HEADER_KEY, WHUNT_HEADER_VALUE } from "@whunt/core";

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
