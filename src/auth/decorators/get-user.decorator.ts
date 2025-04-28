import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../data/dao/user.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity | undefined => {
    const req: { user?: UserEntity } = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

/**
 * Custom decorator to extract the authenticated user from the request object.
 * Returns the UserEntity if present, otherwise undefined.
 */
