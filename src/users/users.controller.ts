import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Public } from 'src/auth/guards/public.decorator';
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
    console.log(user);

    return this.usersService.findById(id);
  }
}
