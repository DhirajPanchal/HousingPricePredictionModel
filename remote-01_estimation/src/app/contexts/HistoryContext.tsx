'use client';

import { createContext, useReducer, useContext, ReactNode } from 'react';

type HousingEntry = {
  id: string;
  formData: {
    square_footage: number;
    bedrooms: number;
    bathrooms: number;
    year_built: number;
    lot_size: number;
    distance_to_city_center: number;
    school_rating: number;
  };
  prediction: number;
};

type ToastType = 'success' | 'error' | 'loading' | null;

type State = {
  history: HousingEntry[];
  selected: string[];
  view: 'history' | 'comparison';
  historyView: 'table' | 'chart';
  toast: { type: ToastType; message: string } | null;
  loading: boolean;
};

type Action =
  | { type: 'ADD_HISTORY'; payload: HousingEntry }
  | { type: 'TOGGLE_SELECT'; payload: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SHOW_TOAST'; payload: { type: ToastType; message: string } }
  | { type: 'CLEAR_TOAST' }
  | { type: 'SWITCH_TO_COMPARISON' }
  | { type: 'SWITCH_TO_HISTORY' }
  | { type: 'SWITCH_HISTORY_VIEW'; payload: 'table' | 'chart' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: State = {
  history: [],
  selected: [],
  view: 'history',
  historyView: 'table',
  toast: null,
  loading: false,
};

const HistoryContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function historyReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_HISTORY':
      return { ...state, history: [action.payload, ...state.history] };
    case 'TOGGLE_SELECT':
      const alreadySelected = state.selected.includes(action.payload);
      let newSelected = alreadySelected
        ? state.selected.filter(id => id !== action.payload)
        : [...state.selected, action.payload];
      if (newSelected.length > 5) newSelected = newSelected.slice(0, 5);
      return { ...state, selected: newSelected };
    case 'CLEAR_SELECTION':
      return { ...state, selected: [] };
    case 'SHOW_TOAST':
      return { ...state, toast: action.payload };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    case 'SWITCH_TO_COMPARISON':
      return { ...state, view: 'comparison' };
    case 'SWITCH_TO_HISTORY':
      return { ...state, view: 'history' };
    case 'SWITCH_HISTORY_VIEW':
      return { ...state, historyView: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(historyReducer, initialState);
  return <HistoryContext.Provider value={{ state, dispatch }}>{children}</HistoryContext.Provider>;
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used inside HistoryProvider');
  return context;
}
