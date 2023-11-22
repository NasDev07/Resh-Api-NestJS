import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private useService: UserService) {}
  async login(dto: AuthDto) {
    const user = await this.useService.findByEmail(dto.email);
    const { password, ...result } = user;
    if (user) {
      return result;
    }

    throw new UnauthorizedException();
  }
}
