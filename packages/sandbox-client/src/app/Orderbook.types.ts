export type OrderbookItem = [string, string];

export interface OrderbookData {
  asks: OrderbookItem[];
  bids: OrderbookItem[];
}
