import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { RemoveProductFromCartDto } from './dto/remove-product-from-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/enums/roles';
import { RolesGuard } from 'src/common/guard/roles.guard';

@ApiTags('carts')
@ApiBearerAuth()
@Controller('carts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Get all carts (Admin only)' })
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: 'Get the logged-in user’s cart' })
  @Get('my')
  async getMyCart(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.cartService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'Add a product to the logged-in user’s cart' })
  @ApiParam({ name: 'productId', description: 'ID of the product to add' })
  @ApiBody({ type: AddProductToCartDto })
  @Post('my/add-product/:productId')
  async addProductToCart(
    @Req() req: Request,
    @Param() addProductToCartDto: AddProductToCartDto,
  ) {
    const userId = req.user['userId'];
    return this.cartService.addProductToCart(
      userId,
      addProductToCartDto.productId,
    );
  }

  @ApiOperation({ summary: 'Remove a product from the logged-in user’s cart' })
  @ApiParam({ name: 'productId', description: 'ID of the product to remove' })
  @Put('my/remove-product/:productId')
  async removeProductFromCart(
    @Req() req: Request,
    @Param() removeProductFromCartDto: RemoveProductFromCartDto,
  ) {
    const userId = req.user['userId'];
    return this.cartService.removeProductFromCart(
      userId,
      removeProductFromCartDto.productId,
    );
  }

  @ApiOperation({ summary: 'Clear the logged-in user’s cart' })
  @Put('my/clear')
  async clearMyCart(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.cartService.clearCart(userId);
  }

  @ApiOperation({ summary: 'Get a cart by ID (Admin only)' })
  @Roles(Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the cart' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cartService.findById(id);
  }

  @ApiOperation({ summary: 'Update a cart by ID (Admin only)' })
  @Roles(Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the cart' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @ApiOperation({ summary: 'Delete a cart by ID (Admin only)' })
  @Roles(Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the cart' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cartService.delete(id);
  }
}
