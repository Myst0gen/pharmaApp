export interface Medicine {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  expiryDate: string;
  colorCode:string;
}

export interface MedicineForm {
  name: string;
  brand: string;
  price: string;
  quantity: string;
  expiryDate: string;
  notes: string;
}


export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}