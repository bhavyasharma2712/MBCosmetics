import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export let persistor = persistStore(store);