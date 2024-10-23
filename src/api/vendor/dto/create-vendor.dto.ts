import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty({ description: 'The name of the vendor', example: 'Vendor A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the vendor', example: 'vendor@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The phone number of the vendor', example: '+123456789' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'The address of the vendor', example: '123 Vendor St, City' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Array of product IDs associated with the vendor', example: ['60bdfc5b12f5a132d4e79a8f'] })
  @IsOptional()
  products?: string[];
}
