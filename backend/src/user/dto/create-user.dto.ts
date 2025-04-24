import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly stationName: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;
}
