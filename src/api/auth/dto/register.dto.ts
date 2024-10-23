import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'test_user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  password: string;
}
