import { GridFilterItem } from "@mui/x-data-grid-pro";

export type SortObject = { [key: string]: string };

export interface ListPayload {
  sort?: SortObject;
  filter?: GridFilterItem[];
  onlyActive: boolean;
  ui_only: {
    index: number;
    size: number;
  };
}

export const DEFAULT_LIST_PAYLOAD: ListPayload = {
  filter: [],
  sort: { id: "asc" },
  onlyActive: false,
  ui_only: {
    index: 0,
    size: 10,
  },
};

export const DEFAULT_GRID_PAYLOAD: ListPayload = {
  filter: [],
  sort: { id: "asc" },
  onlyActive: false,
  ui_only: {
    index: 0,
    size: 50,
  },
};

export interface ListResponse<T> {
  content: T[];
  count: number;
}
//{ id: 1, field: "drug_label_name", operator: "contains", value: "Disprin" },
// { id: 2, field: "active", operator: "contains", value: true },
// { id: 3, field: "class_name", operator: "contains", value: "A" },

export interface ListItem {
  label: string;
  value: number;
}
