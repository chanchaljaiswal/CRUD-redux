import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditRow, clearEditRow } from "../Store/editingSlice";
import { deleteRole, selectRoles, updateRole } from "../Store/rolesSlice";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

export default function RolePage() {
  const roles = useSelector(selectRoles);
  const editRow = useSelector((state) => state.editing);
  const dispatch = useDispatch();
  const [newRoleData, setNewRoleData] = useState({
    roleLabel: "",
    roleKey: "",
  });
  const [showAddFields, setShowAddFields] = useState(false);

  const setEdited = (roleKey) => {
    dispatch(setEditRow(roleKey));
  };

  const save = (roleKey) => {
    const updatedRole = roles.find((role) => role.roleKey === roleKey);
    dispatch(updateRole({ roleKey, updatedRole }));
    dispatch(clearEditRow());
  };

  const handleNewRoleDataChange = (e) => {
    const { name, value } = e.target;
    setNewRoleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addRoleHandler = () => {
    dispatch(updateRole({ roleKey: newRoleData.roleKey, updatedRole: newRoleData }));
    setNewRoleData({
      roleLabel: "",
      roleKey: "",
    });
    setShowAddFields(false);
  };

  const handleDelete = (roleKey) => {
    dispatch(deleteRole(roleKey));
  };

  return (
    <div className="App">
      <div style={{ padding: "5%" }}>
        <Box mb={2} display="flex" justifyContent="flex-end" spacing={10}>
          <Button onClick={() => setShowAddFields(true)} variant="contained">
            Add Role
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Role Key</TableCell>
                <TableCell align="left">Role Label</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.roleKey}>
                  <TableCell component="th" scope="row">
                    {editRow === role.roleKey ? (
                      <TextField
                        onChange={handleNewRoleDataChange}
                        value={role.roleKey}
                        name="roleKey"
                      />
                    ) : (
                      role.roleKey
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRow === role.roleKey ? (
                      <TextField
                        onChange={handleNewRoleDataChange}
                        value={role.roleLabel}
                        name="roleLabel"
                      />
                    ) : (
                      role.roleLabel
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRow === role.roleKey ? (
                      <IconButton onClick={() => save(role.roleKey)}>
                        <CheckIcon size="small" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setEdited(role.roleKey)}>
                        <EditIcon size="small" />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDelete(role.roleKey)}>
                      <DeleteIcon size="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={showAddFields}
        onClose={() => setShowAddFields(false)}
        aria-labelledby="add-role-modal"
        aria-describedby="add-role-form"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            name="roleKey"
            value={newRoleData.roleKey}
            label="Role Key"
            onChange={handleNewRoleDataChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="roleLabel"
            value={newRoleData.roleLabel}
            label="Role Label"
            onChange={handleNewRoleDataChange}
          />
          <Button onClick={addRoleHandler} variant="contained" color="primary">
            Add Role
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
