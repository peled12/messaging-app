import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(6)
  @Matches(/[A-Z]/) // must contain a capital letter
  password: string;
}
