import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // Catch all types of exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // Custom error handling logic
    const message = exception.message || 'Internal Server Error';

    console.error('Caught Exception:', exception);

    response.status(status).json({
      statusCode: status,
      message: message,
      details: exception?.response || 'An unexpected error occurred',
    });
  }
}
