import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  mail: string;

  @ApiProperty({ example: 'username', minLength: 3, maxLength: 12 })
  @IsString()
  @MinLength(3)
  @MaxLength(12)
  username: string;

  @ApiProperty({ example: 'password123', minLength: 6, maxLength: 12 })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
