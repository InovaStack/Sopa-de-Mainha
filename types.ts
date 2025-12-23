
export interface Soup {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: 'sopa' | 'caldo' | 'creme';
  ingredients: string[];
}

export interface CartItem extends Soup {
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  neighborhood: string;
  reference: string;
  paymentMethod: string;
  deliveryTime: string;
}

export type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export interface MenuDay {
  day: DayOfWeek;
  soups: Soup[];
}
