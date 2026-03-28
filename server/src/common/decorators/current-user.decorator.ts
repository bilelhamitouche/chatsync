import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext) => {
  if (context.getType() === 'ws') {
    return context.switchToWs().getClient().user;
  }
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
