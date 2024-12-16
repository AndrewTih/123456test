export interface ICoin {
  contractAddress: string;
  id?: string;
  icon?: string;
  name?: string;
  symbol?: string;
  rank?: number;
  price: number;
  priceBtc?: number;
  volume?: number;
  marketCap?: number;
  availableSupply?: number;
  totalSupply?: number;
  priceChange1h?: number;
  priceChange1d?: number;
  priceChange1w?: number;
  redditUrl?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  explorers?: string[];
}
export interface CoinInfoProps {
  coin: ICoin;
  withSymbol?: boolean;
}


export interface IAssets {
  name?: string;
  amount: number;
  date?: Date;
  grow?: boolean;
  growPercent?: number;
  id: string;
  price: number;
  totalAmount?: number;
  totalProfit?: number;
}
