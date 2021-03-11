import { PriceStatsDto } from './priceStats.dto';

export class CategoryStatsDto extends PriceStatsDto {
  highestPrice: number;
  lowestPrice: number;
}
