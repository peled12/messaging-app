import { AuthPayloadDto } from './auth-payload.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(AuthPayloadDto) {}
