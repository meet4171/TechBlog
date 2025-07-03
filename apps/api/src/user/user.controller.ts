import { Controller, Delete, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  // for admin only 
  @Get('/all')
  getAllUser() { }


  @Delete('/:id')
  deleteUser() { }

  // normal user
  @Get('/:id')
  getUser() { }


  @Put('/:id')
  updateUser() { }


}
