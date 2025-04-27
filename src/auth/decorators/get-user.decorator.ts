import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../dao/user.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity | undefined => {
    const req: { user?: UserEntity } = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
