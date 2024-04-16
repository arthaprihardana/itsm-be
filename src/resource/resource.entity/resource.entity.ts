import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({
  collection: 'resources',
  autoIndex: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ResourceEntity extends Document {
  @Prop({ required: true })
  resources_name!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'RoleEntity', required: true })
  resources_role!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    enum: ['active', 'resign'],
  })
  status!: string;

  @Prop()
  resign_date?: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'DepartmentEntity', required: true })
  department_name!: Types.ObjectId;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;

  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;
}

export const ResourceEntitySchema =
  SchemaFactory.createForClass(ResourceEntity);

ResourceEntitySchema.virtual('roles', {
  ref: 'RoleEntity',
  localField: '_id',
  foreignField: 'resources_role',
});
