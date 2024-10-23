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
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Role } from 'src/common/types/enums/roles';
import { Roles } from 'src/common/decorator/roles.decorator';

@ApiTags('vendors')
@Controller('vendors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @ApiOperation({ summary: 'Retrieve all vendors' })
  @Get()
  async findAll() {
    return this.vendorService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a vendor by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the vendor' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new vendor (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiBody({
    type: CreateVendorDto,
    description: 'The vendor data to be created',
  })
  @Post()
  async create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @ApiOperation({ summary: 'Update a vendor by ID (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiParam({ name: 'id', description: 'The ID of the vendor' })
  @ApiBody({
    type: UpdateVendorDto,
    description: 'The vendor data to be updated',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @ApiOperation({ summary: 'Delete a vendor by ID (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiParam({ name: 'id', description: 'The ID of the vendor to be deleted' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vendorService.delete(id);
  }
}
