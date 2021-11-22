import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import RegisterDto from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from './exceptions/user-notfound.exception';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async register(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto;
    const hashedPassword = await this.getHashedPassword(password);
    const user = await this.prismaService.user.create({
      data: { username, password: hashedPassword },
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

  public async deleteUserById(id: number) {
    const user = await this.prismaService.user.delete({
      where: { id },
    });

    return plainToClass(User, user);
  }

  public async updateUser(updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const hashedPassword = await this.getHashedPassword(password);
    const user = await this.prismaService.user.update({
      where: { id: updateUserDto.id },
      data: { password: hashedPassword },
    });
    return plainToClass(User, user);
  }

  private async getHashedPassword(password: string): Promise<string> {
    const saltLength = 10;
    const salt = await bcrypt.genSalt(saltLength);
    return await bcrypt.hash(password, salt);
  }
}
