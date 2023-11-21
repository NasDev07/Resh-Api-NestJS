import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateUserDto) {
    const checkEmail = await this.findByEmail(dto.email);
    if (checkEmail) {
      throw new ConflictException('email duplicated');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...user } = newUser;
    return user;
  }

  create(CreateUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException('data user tidak ditemukan');
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
