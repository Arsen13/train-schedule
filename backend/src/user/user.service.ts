import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, response: Response) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        stationName: createUserDto.stationName,
      },
    });

    if (existUser) {
      throw new BadRequestException(
        `Station: '${createUserDto.stationName}' already exist`,
      );
    }
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        stationName: createUserDto.stationName,
        password: hashedPassword,
      },
    });

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      stationName: user.stationName,
    });

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

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
