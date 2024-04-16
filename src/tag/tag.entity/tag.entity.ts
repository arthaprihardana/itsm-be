import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from '@ptc-org/nestjs-query-graphql';
import { Document, Types } from 'mongoose';

export class TagEntity extends Document {
  @ObjectId()
  _id: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

export const TagEntitySchema = SchemaFactory.createForClass(TagEntity);
TagEntitySchema.virtual('todoItems', {
  ref: 'TodoItemEntity',
  localField: '_id',
  foreignField: 'tags',
});
