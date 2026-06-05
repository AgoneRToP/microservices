import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'books', timestamps: true, versionKey: false })
export class Book {
  @Prop({ type: SchemaTypes.String })
  title: string;

  @Prop({ type: SchemaTypes.String })
  definition: string;

  @Prop({ type: SchemaTypes.String })
  author: string;

  @Prop({ type: SchemaTypes.Number })
  quantity: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
