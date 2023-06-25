import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface InventoryState {
    inventory: Array<{ id: number; name: string }>
  }

const initialState: InventoryState = {
    inventory: [],
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        addToInventory: (state, action) => {
            state.inventory.push(action.payload)
        },
        removeFromInventory: (state, action) => {
            state.inventory = state.inventory.filter((item) => item.id !== action.payload.id)
        }

    }
});

// Create a persist configuration
const persistConfig = {
    key: "inventory",
    storage,
  };
  
  // Create a persisted reducer using the persistReducer function
  const persistedReducer = persistReducer(persistConfig, inventorySlice.reducer);
  
  export const { addToInventory, removeFromInventory } = inventorySlice.actions;
  
  export default persistedReducer;

