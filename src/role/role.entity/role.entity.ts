import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'roles',
  autoIndex: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class RoleEntity extends Document {
  @Prop({ required: true })
  role_name!: string;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;

  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;
}

export const RoleEntitySchema = SchemaFactory.createForClass(RoleEntity);
