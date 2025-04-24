import React, { useState } from "react";
import ViewToggle from "../control/ViewToggle";
import HouseInputView from "./HouseInputView";
import { ListPayload, ListResponse } from "../model/list.model";
import ActiveDataGrid from "./datagrid/ActiveDataGrid";
import { IPrediction, PREDICTION_COLUMNS } from "../model/property.model";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ViewContainer() {
  const [isGrid, setIsGrid] = useState<boolean>(true);

  const handleViewChange = (view: boolean) => {
    setIsGrid(view);
  };

  const history: IPrediction[] = useSelector(
    (state: RootState) => state.predictions.previous
  );

  const historyList: ListResponse<IPrediction> = {
    content: history,
    count: history.length,
  };

  const loadDrugs = (payload: ListPayload) => {};

  return (
    //className="w-fit p-2"  bg-yellow-200 border-4 border-blue-600
    <div className=" flex flex-col w-full mx-2 px-2">

      <div className="flex justify-end m-2 pr-6">
        <ViewToggle viewChange={(view: boolean) => handleViewChange(view)} />
      </div>

      <div className="px-8 pt-2">
        {isGrid && <HouseInputView />}

        {!isGrid && (
          <ActiveDataGrid
            columns={PREDICTION_COLUMNS}
            listResponse={historyList}
            triggerRefresh={(payload) => loadDrugs(payload)}
          ></ActiveDataGrid>
        )}
      </div>
    </div>
  );
}
