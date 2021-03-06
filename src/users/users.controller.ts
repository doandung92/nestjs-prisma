import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ROLES } from 'src/auth/guards/roles.enum';
import { GetUser } from 'src/config/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
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
    this.checkAdminOrOwner(user, id);
    return this.usersService.findById(id);
  }

  @Delete('/:id')
  @Roles(ROLES.ADMIN)
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id);
  }

  @Put('/:id')
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.checkAdminOrOwner(user, id);
    return this.usersService.updateUser({ ...updateUserDto, id });
  }

  private checkAdminOrOwner(user, id) {
    if (user.id !== id && !user.roles.includes(ROLES.ADMIN))
      throw new ForbiddenException();
  }
}
