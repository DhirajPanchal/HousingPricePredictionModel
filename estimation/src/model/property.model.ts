import { GridColDef } from "@mui/x-data-grid-pro";



export interface IHouseInput {
  square_footage: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  lot_size: number;
  distance_to_city_center: number;
  school_rating: number;
  // ui_only_message?: string;
  // ui_only_errors?: string[];
}

export interface IPrediction {
  square_footage: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  lot_size: number;
  distance_to_city_center: number;
  school_rating: number;
  price?: number;
  id?: string;
}

export const PREDICTION_COLUMNS: GridColDef[] = [
  {
    field: "square_footage",
    headerName: "Square Footage",
    type: "number",
    width: 160,
    filterable: false,
  },
  {
    field: "bedrooms",
    headerName: "Bedrooms",
    type: "number",
    width: 160,
    filterable: false,
  },
  {
    field: "bathrooms",
    headerName: "Bathrooms",
    type: "number",
    width: 160,
    filterable: false,
  },
  {
    field: "year_built",
    headerName: "Year Built",
    type: "number",
    width: 160,
    filterable: false,
  },
  {
    field: "lot_size",
    headerName: "Lot Size",
    type: "number",
    width: 160,
    filterable: false,
  },
  {
    field: "distance_to_city_center",
    headerName: "City Center",
    type: "number",
    width: 160,
    filterable: false,
  },
  {
    field: "school_rating",
    headerName: "School Rating",
    type: "number",
    width: 160,
    filterable: false,

  },
  {
    field: "price",
    headerName: "price",
    type: "number",
    width: 160,
    filterable: false,
  },
];
