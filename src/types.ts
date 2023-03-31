export interface Product {
  id: number;
  image: string;
  price: number;
}
export interface CartProduct extends Product {
  quantity: number;
}