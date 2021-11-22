import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import RegisterDto from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { UserNotFoundException } from './exceptions/user-notfound.exception';

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

  public async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({});
    return plainToClass(User, users);
  }

  public async findById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new UserNotFoundException(id);
    return plainToClass(User, user);
  }
}
