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

import type { Request, Response } from 'express';
import { WhuntError, asyncHandler as _dHandler, whuntLogger, HTTP_STATUS } from "@whunt/core";
import { storage } from '../storage';
import { insertAutomationSchema } from '@shared/schema';
import { AppError, asyncHandler } from '../middlewares/error.middleware';
import type { RequestWithChannel } from '../middlewares/channel.middleware';

export const getAutomations = asyncHandler(async (req: RequestWithChannel, res: Response) => {
  const channelId = req.query.channelId as string | undefined;
  const automations = channelId 
    ? await storage.getAutomationsByChannel(channelId)
    : await storage.getAutomations();
  res.json(automations);
});

export const getAutomation = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const automation = await storage.getAutomation(id);
  if (!automation) {
    throw new AppError(404, 'Automation not found');
  }
  res.json(automation);
});

export const createAutomation = asyncHandler(async (req: RequestWithChannel, res: Response) => {
  console.log('Request body:', req.body); // Debug log  
  const validatedAutomation = insertAutomationSchema.parse(req.body);
  
  // Get active channel if channelId not provided
  let channelId = validatedAutomation.channelId;
  if (!channelId) {
    const activeChannel = await storage.getActiveChannel();
    if (activeChannel) {
      channelId = activeChannel.id;
    }
  }
  
  const automation = await storage.createAutomation({
    ...validatedAutomation,
    channelId
  });
  
  res.json(automation);
});

export const updateAutomation = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const automation = await storage.updateAutomation(id, req.body);
  if (!automation) {
    throw new AppError(404, 'Automation not found');
  }
  res.json(automation);
});

export const deleteAutomation = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await storage.deleteAutomation(id);
  if (!success) {
    throw new AppError(404, 'Automation not found');
  }
  res.status(204).send();
});

export const toggleAutomation = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const automation = await storage.getAutomation(id);
  
  if (!automation) {
    throw new AppError(404, 'Automation not found');
  }
  
  const updated = await storage.updateAutomation(id, {
    status: !automation.status ? 'active' : 'inactive'
  });
  
  res.json(updated);
});