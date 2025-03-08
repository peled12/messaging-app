import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(16)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 digits long' })
  password: string;
}
