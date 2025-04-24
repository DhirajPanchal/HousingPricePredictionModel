export interface Drug {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  class_id: number;
  class_name: string;
  active: boolean;
  deleted: boolean;
  created_on: string;
  updated_on: string;
}