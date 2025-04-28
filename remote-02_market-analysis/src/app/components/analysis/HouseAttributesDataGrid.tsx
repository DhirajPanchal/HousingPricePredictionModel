"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueFormatter } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

interface HouseAttributes {
  id: number;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  distanceToCityCenter: number;
  schoolRating: number;
  price: number;
}

const columns: GridColDef[] = [
  { field: "squareFootage", headerName: "Sq Ft", type: "number", width: 120 },
  { field: "bedrooms", headerName: "Bedrooms", type: "number", width: 100 },
  { field: "bathrooms", headerName: "Bathrooms", type: "number", width: 100 },
  { field: "yearBuilt", headerName: "Year Built", type: "number", width: 120 },
  { field: "lotSize", headerName: "Lot Size", type: "number", width: 120 },
  {
    field: "distanceToCityCenter",
    headerName: "Dist. to City Center",
    type: "number",
    width: 150,
  },
  {
    field: "schoolRating",
    headerName: "School Rating",
    type: "number",
    width: 120,
  },
  {
    field: "price",
    headerName: "Price ($)",
    type: "number",
    width: 140,
    valueFormatter: (value) => {
      const numberValue = value as number;
      return Number.isFinite(numberValue)
        ? numberValue.toLocaleString("en-US")
        : "";
    },
  },
];

export default function HouseAttributesDataGrid() {
  const [rows, setRows] = React.useState<HouseAttributes[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:8004/api/properties")
      .then((res) => res.json())
      .then((data: HouseAttributes[]) => {
        setRows(data);
        setLoading(false);
      })
      .catch(() => {
        setRows([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box className="flex items-center justify-center min-h-[400px]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}
