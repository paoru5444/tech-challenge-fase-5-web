import { authenticatorReducer } from "~/modules/auth/store/slices";
import { taskReducer } from "~/modules/home/store/slices";
import { setupReducer } from "~/modules/setup/store/slices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

function createLocalStorage() {
  return {
    getItem(key: string) {
      return Promise.resolve(window.localStorage.getItem(key));
    },
    setItem(key: string, value: string) {
      window.localStorage.setItem(key, value);
      return Promise.resolve();
    },
    removeItem(key: string) {
      window.localStorage.removeItem(key);
      return Promise.resolve();
    },
  };
}

function createNoopStorage() {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
}

const storage =
  typeof window !== "undefined" ? createLocalStorage() : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: authenticatorReducer,
  task: taskReducer,
  setup: setupReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
