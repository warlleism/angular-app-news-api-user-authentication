import { createAction, createReducer, on, props } from '@ngrx/store';

export interface IAppState {
  items: any[];
}

const localItems = localStorage.getItem('items');
const parsedItems = localItems ? JSON.parse(localItems) : null;

export const appInitialState: IAppState = {
  items: parsedItems || [],
};

export const adicionarNovoItem = createAction(
  '[App] Adicionar item',
  props<{ item: any }>()
);

export const appReducer = createReducer(
  appInitialState,
  on(adicionarNovoItem, (state, action) => {
    const newItem = action.item;
    const newItems = [newItem];
    localStorage.setItem('items', JSON.stringify(newItems));
    return {
      ...state,
      items: newItems,
    };
  })
);
