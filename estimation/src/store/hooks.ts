import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { AppDispatch, RootState } from "./store";

import { useCallback, useState } from "react";

type DispatchFunction = () => AppDispatch;

export const appDispatch: DispatchFunction = useDispatch;

export const appSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useThunk(thunk: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = appDispatch();

  const runThunk: any = useCallback((arg: any) => {
    setIsLoading(true);
    setError(null);
    return dispatch(thunk(arg))
      .unwrap()
      .catch((error: any) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return [runThunk, isLoading, error];
}
