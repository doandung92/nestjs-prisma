import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Public } from 'src/auth/guards/public.decorator';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ROLES } from 'src/auth/guards/roles.enum';
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
  @Public()
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
