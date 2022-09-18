import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer.js";
const store = configureStore({
  reducer: {
    user: reducer,
  },
});

export default store;