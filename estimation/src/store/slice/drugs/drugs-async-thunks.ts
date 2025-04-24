import { createAsyncThunk } from "@reduxjs/toolkit";
import ExternalInterface from "../../../service/ExternalInterface";
import { ListPayload } from "../../../model/list.model";

const fetchDrugList: any = createAsyncThunk(
  "drugs/list",
  async (payload: ListPayload) => {
    const data = await ExternalInterface.loadDrugList(payload);
    // console.log(" fetchDrugList :: ");
    // console.log(data);
    return data;
  }
);

const fetchDrugCategories: any = createAsyncThunk(
  "drugs/categories",
  async (search: string = "") => {
    const data = await ExternalInterface.loadProvider("drug_category", search);
    return data;
  }
);

const fetchDrugClasses: any = createAsyncThunk(
  "drugs/classes",
  async (search: string = "") => {
    const data = await ExternalInterface.loadProvider("drug_class", search);
    return data;
  }
);



export { fetchDrugList, fetchDrugCategories, fetchDrugClasses };
