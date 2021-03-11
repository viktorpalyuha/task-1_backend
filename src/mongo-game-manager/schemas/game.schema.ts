import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  categories: string;

  @ApiProperty()
  @Prop({ required: true })
  img_url: string;

  @ApiProperty()
  @Prop({ required: true })
  developer: string;

  @ApiProperty()
  @Prop({ required: true })
  price: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);
