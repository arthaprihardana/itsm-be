import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'stakeholders',
  autoIndex: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class StakeholderEntity extends Document {
  @Prop({ required: true })
  stakeholder_name!: string;

  @Prop({ required: true })
  business_unit!: string;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;

  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;
}

export const StakeholderEntitySchema =
  SchemaFactory.createForClass(StakeholderEntity);

StakeholderEntitySchema.virtual('products', {
  ref: 'ProductEntity',
  localField: '_id',
  foreignField: 'stakeholder',
});
