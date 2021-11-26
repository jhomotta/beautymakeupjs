import { Image } from './image';
export interface Product {
  id: number;
  name: String;
  description: String;
  quantityProducts: number;
  unitCost: number;
  state: boolean;
  idPProductType: number;
  idManufacturer: number;
  images: Image[];
  starRating:  number;
}