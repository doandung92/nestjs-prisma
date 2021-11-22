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
    return await this.prismaService.user.create({
      data: { ...registerDto },
      select: {
        id: true,
        username: true,
      },
    });
  }

  public async findByUsername(username: string) {
    return await this.prismaService.user.findUnique({
      where: { username },
    });
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
