import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';
import { Product } from '../product/product.schema';  // Assuming Product schema exists
import { User } from '../user/user.schema';  // Assuming User schema exists

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // Find all carts 
  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().populate('user').populate('products').exec();
  }

  // Find cart by ID
  async findById(id: string): Promise<Cart> {
    const cart = await this.cartModel.findById(id).populate('products').exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  // Find active cart for a user
  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Active cart not found for this user');
    }
    return cart;
  }

  // Create or get existing cart for a user
  async createOrGetCartForUser(userId: string): Promise<Cart> {
    let cart = await this.findCartByUserId(userId);
    if (!cart) {
      cart = new this.cartModel({
        user: userId,
        products: [],
        totalPrice: 0,
      });
      return cart.save();
    }
    return cart;
  }

  /// Add a product to the cart and recalculate the total price
  async addProductToCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.createOrGetCartForUser(userId);
    const product = await this.findProductById(productId);

    if (!this.isProductInCart(cart, productId)) {
      this.addProduct(cart, product);
    }

    return cart.save();
  }

  // Remove a product from the cart and recalculate the total price
  async removeProductFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.createOrGetCartForUser(userId);
    const product = await this.findProductById(productId);

    const productIndex = cart.products.findIndex((p) => p.toString() === productId);

    if (productIndex >= 0) {
      cart.products.splice(productIndex, 1);
      // Recalculate total price
      cart.totalPrice -= product.price;
    } else {
      throw new NotFoundException('Product not in cart');
    }

    return cart.save();
  }

  // Clear all products from the cart
  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.createOrGetCartForUser(userId);
    cart.products = [];
    cart.totalPrice = 0;

    return cart.save();
  }

  // Update cart directly (admin functionality)
  async update(id: string, cartData: Partial<Cart>): Promise<Cart> {
    const cart = await this.cartModel.findByIdAndUpdate(id, cartData, { new: true }).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  // Delete a cart (admin functionality)
  async delete(id: string): Promise<any> {
    const result = await this.cartModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Cart not found');
    }
    return result;
  }

  // Helper method to find a cart by user ID
  private async findCartByUserId(userId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ user: userId }).populate('products').exec();
  }

  // Helper method to find a product by ID
  private async findProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

   // Helper method to check if a product is already in the cart
   private isProductInCart(cart: Cart, productId: string): boolean {
    return cart.products.some((p) => p.toString() === productId);
  }

  // Helper method to add a product to the cart and update the total price
  private addProduct(cart: Cart, product: Product): void {
    cart.products.push(product.id);
    cart.totalPrice += product.price;
  }
}
