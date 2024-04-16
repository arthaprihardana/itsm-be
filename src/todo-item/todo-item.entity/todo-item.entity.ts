import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from '@ptc-org/nestjs-query-graphql';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class TodoItemEntity extends Document {
  @ObjectId()
  _id: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  completed!: boolean;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'TagEntity' }])
  tags!: Types.ObjectId[];

  @Prop({ default: 0 })
  priority!: number;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

export const TodoItemEntitySchema =
  SchemaFactory.createForClass(TodoItemEntity);
TodoItemEntitySchema.virtual('subTasks', {
  ref: 'SubTaskEntity',
  localField: '_id',
  foreignField: 'todoItem',
});
