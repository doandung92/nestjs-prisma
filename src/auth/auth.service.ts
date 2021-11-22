import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { SigninDto } from './dto/signin.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<User> {
    return this.usersService.register(registerDto);
  }

  public async signin(signinDto: SigninDto): Promise<SignInResponseDto> {
    const { username, password } = signinDto;
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  public async getHashedPassword(password: string): Promise<string> {
    const saltLength = 10;
    const salt = await bcrypt.genSalt(saltLength);
    return await bcrypt.hash(password, salt);
  }
}
