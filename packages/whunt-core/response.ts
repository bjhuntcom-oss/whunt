import type { Response } from "express";
import { HTTP_STATUS, WHUNT_HEADER_KEY, WHUNT_HEADER_VALUE } from "./constants";

export interface WhuntApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

function setBrandHeader(res: Response): void {
  if (!res.headersSent) {
    res.setHeader(WHUNT_HEADER_KEY, WHUNT_HEADER_VALUE);
  }
}

export class WhuntResponse {
  static success<T>(res: Response, data?: T, message?: string, statusCode: number = HTTP_STATUS.OK): Response {
    setBrandHeader(res);
    const body: WhuntApiResponse<T> = {
      success: true,
      ...(message && { message }),
      ...(data !== undefined && { data }),
    };
    return res.status(statusCode).json(body);
  }

  static created<T>(res: Response, data?: T, message = "Resource created successfully"): Response {
    return WhuntResponse.success(res, data, message, HTTP_STATUS.CREATED);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message?: string
  ): Response {
    setBrandHeader(res);
    const totalPages = Math.ceil(total / limit);
    const body: WhuntApiResponse<T[]> = {
      success: true,
      ...(message && { message }),
      data,
      meta: { page, limit, total, totalPages },
    };
    return res.status(HTTP_STATUS.OK).json(body);
  }

  static error(
    res: Response,
    message = "An error occurred",
    statusCode = HTTP_STATUS.INTERNAL_ERROR,
    errors?: Record<string, string[]>
  ): Response {
    setBrandHeader(res);
    const body: WhuntApiResponse = {
      success: false,
      message,
      ...(errors && { errors }),
    };
    return res.status(statusCode).json(body);
  }

  static noContent(res: Response): Response {
    setBrandHeader(res);
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }
}

