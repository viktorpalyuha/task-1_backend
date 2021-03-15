import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  categories: string;

  @Prop({ required: true })
  img_url: string;

  @Prop({ required: true })
  developer: string;

  @Prop({ required: true })
  price: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);
