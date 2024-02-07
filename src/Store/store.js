// store.js

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import editingReducer from "./editingSlice";
import rolesReducer from "./rolesSlice"; // Import the rolesSlice

export default configureStore({
  reducer: {
    users: usersReducer,
    editing: editingReducer,
    roles: rolesReducer, // Include the rolesSlice
  },
});
