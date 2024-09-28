export interface Meal {
  quantity: number;
  price: number;
  name: string;
  category: string;
  image?: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
