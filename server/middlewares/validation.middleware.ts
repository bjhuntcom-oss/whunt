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
import { whuntLogger, HTTP_STATUS, WHUNT_BRAND } from "@whunt/core";
import { z } from 'zod';
import { AppError } from './error.middleware';

export function validateRequest(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, `Validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  };
}

export function validateQuery(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, `Query validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  };
}

export function validateParams(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, `Params validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  };
}