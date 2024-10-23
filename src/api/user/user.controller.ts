import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/enums/roles';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve all users (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a user by ID (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiBody({
    type: CreateUserDto,
    description: 'The user data to create',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update a user by ID (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to be updated',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'The user data to update',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to be deleted',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
