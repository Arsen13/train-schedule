import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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

    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        stationName: createUserDto.stationName,
        password: hashedPassword,
      },
    });
  }
}
