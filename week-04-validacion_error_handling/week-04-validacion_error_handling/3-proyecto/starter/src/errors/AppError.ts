// ============================================
// ERRORS — AppError (clase de errores operacionales)
// ============================================

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational: boolean = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Mantiene la cadena de prototipos correcta al extender clases nativas como Error
    Object.setPrototypeOf(this, new.target.prototype);

    // Excluye el constructor del stack trace para un stack más limpio
    Error.captureStackTrace(this, this.constructor);
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}