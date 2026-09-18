import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

const NOT_FOUND_ERRORS = [
  'ProductNotFoundError',
  'VariantNotFoundError',
  'CategoryNotFoundError',
  'CartNotFoundError',
  'OrderNotFoundError',
];

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    const status = NOT_FOUND_ERRORS.includes(exception.name) ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }
}
