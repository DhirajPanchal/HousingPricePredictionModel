import { useState, useCallback } from 'react';
import { appDispatch } from '../store/hooks';

export function useThunk(thunk: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = appDispatch();

  const runThunk:any = useCallback(
    (arg: any) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((error: any) => setError(error))
        .finally(() => setIsLoading(false));
    },
    []
  );

  return [runThunk, isLoading, error];
}
  