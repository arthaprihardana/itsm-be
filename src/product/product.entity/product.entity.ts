import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from '@ptc-org/nestjs-query-graphql';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({
  collection: 'products',
  autoIndex: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ProductEntity extends Document {
  @ObjectId()
  _id: Types.ObjectId;

  @Prop({ required: true })
  product_name!: string;

  @Prop({ required: true })
  product_description!: string;

  @Prop({
    type: String,
    required: true,
    enum: ['digital', 'paas', 'non-telco'],
  })
  product_category!: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'StakeholderEntity',
    required: true,
  })
  stakeholder!: Types.ObjectId;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;

  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;
}

export const ProductEntitySchema = SchemaFactory.createForClass(ProductEntity);

ProductEntitySchema.virtual('projects', {
  ref: 'ProjectEntity',
  localField: '_id',
  foreignField: 'product',
});
