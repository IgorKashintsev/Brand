export interface Product {
  id: number;
  image: string;
  price: number;
}
export interface CartProduct extends Product {
  quantity: number;
}

export interface UserObj {
  auth: boolean;
  firstName: string;
  login: string;
  cartContents: CartProduct[];
}

export interface UserObjJson {
  firstName: string;
  lastName: string;
  gender: string;
  login: string;
  password: string
  cartContents: CartProduct[];
}

export interface UserLogPass {
  login: string;
  password: string;
}
