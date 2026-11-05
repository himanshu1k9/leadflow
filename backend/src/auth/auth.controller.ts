import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    const user = await this.userService.create(dto);
    return {
      message: 'Registation successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }
}
