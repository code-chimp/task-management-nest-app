import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs';

/**
 * Interceptor that transforms all outgoing responses to plain objects.
 * Useful for serializing entities and hiding sensitive fields.
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler<any>) {
    // Transform the response data to plain objects
    return next.handle().pipe(map(data => instanceToPlain(data)));
  }
}
