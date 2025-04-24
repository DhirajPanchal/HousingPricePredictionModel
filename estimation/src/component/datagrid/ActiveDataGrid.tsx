import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  DataGridPro,
  GridColDef,
  GridFilterModel,
  GridRowSelectionModel,
  GridSortItem,
  GridSortModel,
  gridClasses,
  GridSortDirection,
  GridFilterItem,
} from "@mui/x-data-grid-pro";
import { alpha, styled } from "@mui/material/styles";

import {
  DEFAULT_LIST_PAYLOAD,
  ListPayload,
  ListResponse,
  SortObject,
} from "../../model/list.model";


import BusySpinner from "../../control/BusySpinner";

type ActiveDataGridProps = {
  columns: GridColDef[];
  listResponse: ListResponse<any>;
  triggerRefresh: (payload: any) => void;
  onRowSelection?: (entityId: number) => void | undefined;
  loading?: boolean;
  error?: boolean;
};

export default function ActiveDataGrid({
  columns,
  listResponse,
  triggerRefresh,
  ...props
}: PropsWithChildren<ActiveDataGridProps>) {
  console.log(" < ActiveDataGrid > ");

  const ODD_OPACITY = 0.2;

  const [payload, dispatch] = useReducer(reducer, DEFAULT_LIST_PAYLOAD);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const handleRowClick = (model: GridRowSelectionModel) => {
    // console.log("_ADG - Row Selection :", model);
  };

  useEffect(() => {
    console.log(" < ActiveDataGrid > useEffect ");
    if (triggerRefresh) {
      triggerRefresh(payload);
    }
  }, [payload]);

  function reducer(state: any, action: any) {
    // console.log(" CHANGE ", action);
    // // console.log(state);

    let cache: any;
    switch (action.type) {
      case REFRESH: {
        cache = {
          ...state,
        };
        break;
      }
      case CLEAR_ALL_FILTERS: {
        cache = {
          ...state,
          ...DEFAULT_LIST_PAYLOAD,
        };
        break;
      }
      case ACTIVE_ONLY: {
        cache = {
          ...state,
          onlyActive: action.checked,
        };
        break;
      }
      case PAGINATION: {
        cache = {
          ...state,
          ui_only: {
            ...state.ui_only,
            index: action.model.page,
            size: action.model.pageSize,
          },
        };
        break;
      }
      case SORT: {
        cache = {
          ...state,
          sort: action.sortObj,
        };
        break;
      }
      case FILTER: {
        cache = {
          ...state,
          filter: action.list,
        };
        break;
      }
    }

    return cache;
  }

  function handleSort(model: GridSortModel) {
    if (model && model.length > 0) {
      let sortObj: SortObject = {};

      model.map((m) => {
        console.table("SORT :: " + m.field + " ( " + m.sort + " )");
        const sortfield = "" + m.field;
        const sortOrder = "" + m.sort;
        sortObj = { ...sortObj, [sortfield]: sortOrder };
      });

      dispatch({ type: SORT, sortObj });
    }
  }

  const deriveSortModel = (payload: ListPayload): GridSortItem[] => {
    let list: GridSortItem[] = [];
    if (payload && payload.sort) {
      const sortObj = payload.sort;
      const sortKeys = Object.keys(sortObj);
      sortKeys.map((key) => {
        list.push({ field: key, sort: sortObj[key] as GridSortDirection });
      });
    }
    return list;
  };

  const deriveFilterModel = (payload: ListPayload): GridFilterModel => {
    let list: GridFilterItem[] = [];
    if (payload && payload.filter && payload.filter.length > 0) {
      payload.filter.map((fi, index) => list.push({ ...fi, id: index }));
    }
    return { items: list };
  };


  const StripedDataGrid = styled(DataGridPro)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));

  return (
    <div className="adg-wrapper bg-gray-200">
      <div className="adg-header">
        <div className="adg-header-left-slot">{props.children}</div>

        <div className="adg-header-right-slot">
          <BusySpinner
            isLoading={props.loading}
            isError={props.error}
            className="float-right"
          />
        </div>
      </div>
      {/* D A T A   G R I D */}

      <StripedDataGrid
        sx={{ height: "520px", bgcolor: "white" }}
        columns={columns}
        rows={listResponse.content ? listResponse.content : []}
        rowCount={listResponse.count ? listResponse.count : 0}
        rowHeight={38}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: payload.ui_only.size,
              page: payload.ui_only.index,
            },
          },
        }}
        pagination={true}
        paginationModel={{
          page: payload.ui_only.index,
          pageSize: payload.ui_only.size,
        }}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        onPaginationModelChange={(model) =>
          dispatch({ type: PAGINATION, model })
        }
        sortingMode="client"
        sortModel={deriveSortModel(payload)}
        onSortModelChange={(model) => handleSort(model)}
        filterMode="client"
        // filterDebounceMs={5000}
        filterModel={deriveFilterModel(payload)}
        // onFilterModelChange={(model) => handleFilter(model)}
        onRowSelectionModelChange={(model) => handleRowClick(model)}
      />
    </div>
  );
}
const PAGINATION: string = "PAGINATION";
const SORT: string = "SORT";
const FILTER: string = "FILTER";
const ACTIVE_ONLY: string = "ACTIVE_ONLY";
const REFRESH: string = "REFRESH";
const CLEAR_ALL_FILTERS: string = "CLEAR_ALL_FILTERS";
