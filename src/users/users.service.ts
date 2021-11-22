import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import RegisterDto from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: { ...registerDto },
    });
    return plainToClass(User, user);
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { username },
    });
  }
}
