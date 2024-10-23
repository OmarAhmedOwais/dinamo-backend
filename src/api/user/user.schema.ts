import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common/types/enums/roles';


@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role, default: Role.User })
  role: Role;

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
