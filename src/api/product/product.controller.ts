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
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/enums/roles';
import { RolesGuard } from 'src/common/guard/roles.guard';

@ApiTags('products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Retrieve a list of all products' })
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a product by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new product (Vendor only)' })
  @ApiBearerAuth()
  @Roles(Role.Vendor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({
    type: CreateProductDto,
    description: 'The product data to be created',
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Update an existing product by ID (Vendor only)' })
  @ApiBearerAuth()
  @Roles(Role.Vendor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to be updated',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'The product data to be updated',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product by ID (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to be deleted',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
