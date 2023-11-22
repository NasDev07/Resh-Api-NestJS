import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private useService: UserService) {}
  async login(dto: AuthDto) {
    const user = await this.useService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }
}
