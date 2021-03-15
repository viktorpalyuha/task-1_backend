import { PriceStatsDto } from './priceStats.dto';

export class CategoryStatsDto extends PriceStatsDto {
  category: string;
  highestPrice: number;
  lowestPrice: number;
}
