import React, { useEffect, useState } from "react";
import ActiveButton from "../../control/ActiveButton";
import { GridFilterItem } from "@mui/x-data-grid-pro";
import { IoMdAdd } from "react-icons/io";
import ActiveDropdown, { Option } from "../../control/ActiveDropdown";

export type FilterItem = {
  id?: string | number;
  field: string;
  label: string;
  operators: string[];
  type: string;
  values?: any[];
};

type FilterForm = {
  fieldDropdown: Option[];
  selectedField: Option;
  operatorDropdown: Option[];
  selectedOperator: Option;
  selectedValue: string | number | boolean;
};

const defaultFilterForm: FilterForm = {
  fieldDropdown: [],
  selectedField: { label: "", value: "" },
  operatorDropdown: [],
  selectedOperator: { label: "", value: "" },
  selectedValue: "",
};

type FilterModalProps = {
  FILTER_CONFIG: FilterItem[];
  filterModel: any[];
  onFilterChange?: (filters: GridFilterItem[]) => void;
  isOpen: boolean;
  onClose: () => void;
};

const FilterModal = ({
  FILTER_CONFIG,
  filterModel,
  onFilterChange,
  isOpen,
  onClose,
}: FilterModalProps) => {
  // console.log("< FilterModal >");

  const [localFilterModel, setLocalFilterModel] = useState<any[]>(filterModel);

  const [filterForm, setFilterForm] = useState<FilterForm>(defaultFilterForm);

  useEffect(() => {
    console.log("< FilterModal > USE-EFFECT ");
    console.log(localFilterModel);

    determineFieldOptions();
  }, [filterModel, localFilterModel]);

  const determineFieldOptions = () => {
    let list: Option[] = [];
    FILTER_CONFIG.map((FC) => {
      let found: boolean = false;
      localFilterModel.map((filter) => {
        if (filter.field === FC.field) {
          found = true;
        }
      });
      if (found === false) {
        list.push({ label: FC.label, value: FC.field });
      }
    });
    // console.log("list1 ", list);
    setFilterForm((previous) => {
      return {
        ...previous,
        fieldDropdown: list,
        operatorDropdown: [],
        selectedValue: "",
      };
    });
  };

  const onFieldChange = (option: Option) => {
    // console.log(option);
    let list: Option[] = [];
    if (option) {
      FILTER_CONFIG.map((FC) => {
        if (FC.field === option.value) {
          FC.operators.map((operator) => {
            list.push({ label: operator, value: operator });
          });
        }
      });
    }
    setFilterForm((previous) => {
      return {
        ...previous,
        selectedField: option,
        operatorDropdown: list,
        selectedValue: "",
      };
    });
  };

  const onOperatorChange = (option: Option) => {
    if (option) {
      setFilterForm((previous) => {
        return { ...previous, selectedOperator: option };
      });
    }
  };

  const onSearchValueChange = (value: any) => {
    if (value !== undefined) {
      setFilterForm((previous) => {
        return { ...previous, selectedValue: value };
      });
    }
  };

  const addFilterHandler = () => {
    // console.log("ADD");
    // console.log(filterForm);

    if (
      filterForm.selectedField.value !== "" &&
      filterForm.selectedOperator.value !== "" &&
      filterForm.selectedValue !== ""
    ) {
      const newFilter: GridFilterItem = {
        field: filterForm.selectedField.value,
        operator: filterForm.selectedOperator.value,
        value: filterForm.selectedValue,
      };
      // console.log(newFilter);

      setLocalFilterModel((previous) => {
        return [...previous, newFilter];
      });

      setFilterForm(defaultFilterForm);
    }
  };

  const applyFilterHandler = () => {
    if (onFilterChange) {
      onFilterChange(localFilterModel);
    }
    setLocalFilterModel([]);
  };

  const genFiterItem = (fi: GridFilterItem, index: number) => {
    // console.log(" FI view : ", fi);
    let selectedFieldLabel: string = fi.field;
    FILTER_CONFIG.map((FC) => {
      if (FC.field === fi.field) {
        selectedFieldLabel = FC.label;
      }
    });
    return (
      <tr key={index}>
        <td># {index + 1}</td>
        <td>{selectedFieldLabel}</td>
        <td>{fi.operator}</td>
        <td>{"" + fi.value}</td>
      </tr>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="adg-filter">
      <div className="adg-filter-body border-2 border-gray-400">
        <div className="adg-filter-title border-b-0 border-gray-400">
          <h1 className="text-xl font-bold">Filter</h1>
        </div>
        <div className="adg-filter-view">
          <table>
            {localFilterModel.length > 0 && (
              <thead>
                <tr>
                  <th></th>
                  <th>Field</th>
                  <th>Operator</th>
                  <th>Value</th>
                </tr>
              </thead>
            )}
            <tbody>
              {localFilterModel.map((fi, index) => genFiterItem(fi, index))}
            </tbody>
          </table>
        </div>

        <div className="adg-filter-form border-t-0 border-gray-400">
          <ActiveDropdown
            options={filterForm.fieldDropdown}
            onChange={(option) => onFieldChange(option)}
            value={filterForm.selectedField}
          />
          <ActiveDropdown
            options={filterForm.operatorDropdown}
            onChange={(option) => onOperatorChange(option)}
            value={filterForm.selectedOperator}
          />
          <input
            type="text"
            className="border-b-2 h-12"
            placeholder="search..."
            value={"" + filterForm.selectedValue}
            onChange={(event) => onSearchValueChange(event.target.value)}
          />
          <ActiveButton
            amazon
            className="text-black h-10"
            onClick={addFilterHandler}
          >
            <IoMdAdd /> Add
          </ActiveButton>
        </div>
        <div className="adg-filter-toolbar border-t-0 border-gray-400">
          <ActiveButton onClick={onClose}>Cancel</ActiveButton>
          <ActiveButton amazon onClick={applyFilterHandler}>
            Apply Filter
          </ActiveButton>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
