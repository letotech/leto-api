import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC } from "../decorators/use-is-public.decorator";
import * as jwt from "jsonwebtoken"

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext):Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(isPublic) return true;
    
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();

    const currentUser = request.user;
    request.headers['user'] = currentUser.id;
    return true
  }
}