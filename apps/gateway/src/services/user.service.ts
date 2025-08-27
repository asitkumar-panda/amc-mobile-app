import { Injectable } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';

@Injectable()
export class UserService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.USER_SERVICE_PORT) || 6000,
    },
  })
  private client: ClientTCP;

  create(createUserDto: any) {
    return this.client.send({ cmd: 'createUser' }, createUserDto);
  }

  login(loginDto: any) {
    return this.client.send({ cmd: 'login' }, loginDto);
  }

  update(id: string, updateUserDto: any) {
    return this.client.send({ cmd: 'updateUser' }, { id, updateUserDto });
  }

  delete(id: string) {
    return this.client.send({ cmd: 'deleteUser' }, id);
  }
} 