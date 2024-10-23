import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Role } from 'src/common/types/enums/roles';

@Injectable()
export class VendorService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Fetch all users who are vendors
  async findAll(): Promise<User[]> {
    return this.userModel.find({ role: Role.Vendor }).exec();
  }

  // Find a vendor by ID
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id, role: Role.Vendor }).exec();
  }

  // Create a new vendor (update the user's role to Vendor)
  async create(vendor: CreateVendorDto): Promise<User> {
    const newVendor = new this.userModel({ ...vendor, role: Role.Vendor });
    return newVendor.save();
  }

  // Update an existing vendor
  async update(id: string, vendor: UpdateVendorDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ _id: id, role: Role.Vendor }, vendor, { new: true })
      .exec();
  }

  // Delete a vendor by ID
  async delete(id: string): Promise<any> {
    return this.userModel
      .findOneAndDelete({ _id: id, role: Role.Vendor })
      .exec();
  }
}
