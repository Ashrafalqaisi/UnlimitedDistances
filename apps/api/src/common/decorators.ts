import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

/** Skip the JWT check for this route or controller. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/** Restrict a route to users with one of the given roles. */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

/** Injects the authenticated user ({ id, role }) into a handler argument. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user,
);
