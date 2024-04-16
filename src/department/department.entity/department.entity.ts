import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from '@ptc-org/nestjs-query-graphql';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'departments',
  autoIndex: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class DepartmentEntity extends Document {
  @ObjectId()
  _id: Types.ObjectId;

  @Prop({ required: true })
  department_name!: string;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;

  @Prop()
  created_by!: string;

  @Prop()
  updated_by!: string;
}

export const DepartmentEntitySchema =
  SchemaFactory.createForClass(DepartmentEntity);

DepartmentEntitySchema.virtual('resources', {
  ref: 'ResourceEntity',
  localField: '_id',
  foreignField: 'department_name',
});
