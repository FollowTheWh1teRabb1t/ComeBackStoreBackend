export type CheckoutItem = {
  title: string;
  price: string;
  quantity: number;
};

export interface CreateCheckoutSessionDTO {
  items: CheckoutItem[];
}