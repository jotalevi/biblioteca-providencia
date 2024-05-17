import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { UserService } from '../../application/users/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const publicKey = await fs.readFile(path.resolve(process.env.PUBLIC_RSA_KEY_PATH))
      const payload = await this.jwtService.verifyAsync(token, {
        publicKey: String(publicKey),
      })

      const user = await this.userService.findOne({ id: payload.sub })
      request['user'] = user
    } catch (err) {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
