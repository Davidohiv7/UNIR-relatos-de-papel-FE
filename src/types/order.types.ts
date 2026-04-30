export type BookOrder = {
  id: number;
  bookId: number;
  orderId: number;
  quantity: number;
};

export type Order = {
  id: number;
  customerId: number;
  books: BookOrder[];
  status: string;
};
