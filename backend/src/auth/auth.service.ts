import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException(`User with email: ${email} not found`);
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      throw new BadRequestException('Password is incorrect');
    }

    const { password: userPassword, ...result } = user;

    return result;
  }

  async login(user: IUser, response: Response) {
    const payload = {
      id: user.id,
      email: user.email,
      stationName: user.stationName,
    };

    const token = this.jwtService.sign(payload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    return {
      id: user.id,
      email: user.email,
      stationName: user.stationName,
    };
  }
}
