import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from '@ptc-org/nestjs-query-graphql';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({
  collection: 'projects',
  autoIndex: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ProjectEntity extends Document {
  @ObjectId()
  _id: Types.ObjectId;

  @Prop({ required: true })
  project_sr!: string;

  @Prop({ required: true })
  project_name!: string;

  @Prop({ required: true })
  project_description!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ResourceEntity' })
  pmo?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductEntity' })
  product!: string;

  @Prop({ required: true })
  mandays!: number;

  @Prop({ required: true })
  target_revenue!: number;

  @Prop()
  actual_revenue?: number;

  @Prop({ required: true })
  score!: number;

  @Prop()
  rollout_date: Date;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;

  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;
}

export const ProjectEntitySchema = SchemaFactory.createForClass(ProjectEntity);
