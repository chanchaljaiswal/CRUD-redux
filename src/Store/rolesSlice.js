import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [
    { roleLabel: "Admin", roleKey: "admin" },
    { roleLabel: "User", roleKey: "user" }
  ]
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    
    updateRole: (state, action) => {
      const { roleKey, updatedRole } = action.payload;
      const existingRoleIndex = state.roles.findIndex(role => role.roleKey === roleKey);
      if (existingRoleIndex !== -1) {
        // If roleKey exists, update the role
        state.roles[existingRoleIndex] = { ...state.roles[existingRoleIndex], ...updatedRole };
      } else {
        // If roleKey doesn't exist, add the new role
        state.roles.push(updatedRole);
      }
    },
    deleteRole: (state, action) => {
      const roleKey = action.payload;
      state.roles = state.roles.filter(role => role.roleKey !== roleKey);
    }
  }
});

export const { updateRole, deleteRole } = rolesSlice.actions;

export const selectRoles = (state) => state.roles.roles;

export default rolesSlice.reducer;
