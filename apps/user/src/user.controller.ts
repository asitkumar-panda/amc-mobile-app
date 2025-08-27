import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'login' })
  login(@Payload() loginDto: any) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() payload: { id: string; updateUserDto: any }) {
    return this.userService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }
}
