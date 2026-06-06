import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'customers', timestamps: true, versionKey: false })
export class Customer {
  @Prop({ type: SchemaTypes.String, required: true })
  name: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true })
  password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
