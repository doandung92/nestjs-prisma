import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ROLES } from 'src/auth/guards/roles.enum';
import { GetUser } from 'src/config/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(ROLES.ADMIN)
  public getUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  public getUserById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    if (user.id !== id && !user.roles.includes(ROLES.ADMIN))
      throw new ForbiddenException();
    return this.usersService.findById(id);
  }

  @Delete('/:id')
  @Roles(ROLES.ADMIN)
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id);
  }
}
