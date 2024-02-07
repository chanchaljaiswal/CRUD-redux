// App.js

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditRow, clearEditRow } from "../Store/editingSlice";
import { selectRoles } from "../Store/rolesSlice"; // Import selectRoles
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
import { addUser, deleteUser, editUser } from "../Store/usersSlice";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
    const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const editRow = useSelector((state) => state.editing);
  const roles = useSelector(selectRoles); // Fetch roles from Redux store
  const dispatch = useDispatch();
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    username: "",
    mobile: "",
    roleKey: "",
    password: "",
  });
  const [showAddFields, setShowAddFields] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const setEdited = (id) => {
    dispatch(setEditRow(id));
  };

  const save = () => {
    dispatch(editUser(editRow));
    dispatch(clearEditRow());
  };

  const handleNewUserDataChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditDataChange = (e, id) => {
    const { name, value } = e.target;
    const updatedUserData = {
      ...users.find((user) => user.id === id),
      [name]: value,
    };
    dispatch(editUser(updatedUserData));
  };

  const addUserHandler = () => {
    const newId = users.length + 1;
    const newUser = { id: newId, ...newUserData };
    dispatch(addUser(newUser));
    setNewUserData({
      name: "",
      email: "",
      username: "",
      mobile: "",
      roleKey: "",
      password: "",
    });
    setShowAddFields(false);
  };

  return (
    <div className="App">
      <div style={{ padding: "5%" }}>
        <h2>User List</h2>
        <Box mb={2} display="flex" justifyContent="flex-end" spacing={10}>
          <Button onClick={() => setShowAddFields(true)} variant="contained">
            Add User
          </Button>
          <Button style={{marginLeft: '10px'}} onClick={() => navigate("/edit-roles")} variant="contained">
           Edit roles
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Mobile</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">
                    {editRow === item.id ? (
                      <TextField
                        onChange={(e) => handleEditDataChange(e, item.id)}
                        value={item.name}
                        name="name"
                        label="Name"
                      />
                    ) : (
                      item.name
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRow === item.id ? (
                      <TextField
                        onChange={(e) => handleEditDataChange(e, item.id)}
                        value={item.email}
                        name="email"
                        label="Email"
                      />
                    ) : (
                      item.email
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRow === item.id ? (
                      <TextField
                        onChange={(e) => handleEditDataChange(e, item.id)}
                        value={item.username}
                        name="username"
                        label="Username"
                      />
                    ) : (
                      item.username
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRow === item.id ? (
                      <TextField
                        onChange={(e) => handleEditDataChange(e, item.id)}
                        value={item.mobile}
                        name="mobile"
                        label="Mobile"
                      />
                    ) : (
                      item.mobile
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRow === item.id ? (
                      <FormControl fullWidth>
                        <InputLabel id={`roleKey-label-${item.id}`}>
                          Role
                        </InputLabel>
                        <Select
                          labelId={`roleKey-label-${item.id}`}
                          id={`roleKey-${item.id}`}
                          value={item.roleKey}
                          onChange={(e) => handleEditDataChange(e, item.id)}
                          name="roleKey"
                        >
                          {roles.map((role) => (
                            <MenuItem key={role.roleKey} value={role.roleKey}>
                              {role.roleLabel}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      roles.find((role) => role.roleKey === item.roleKey)
                        ?.roleLabel
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon size="small" />
                    </IconButton>
                    {editRow === item.id ? (
                      <IconButton onClick={save}>
                        <CheckIcon size="small" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setEdited(item.id)}>
                        <EditIcon size="small" />
                      </IconButton>
                    )}
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
        aria-labelledby="add-user-modal"
        aria-describedby="add-user-form"
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
            name="name"
            value={newUserData.name}
            label="Name"
            onChange={handleNewUserDataChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="email"
            value={newUserData.email}
            label="Email"
            onChange={handleNewUserDataChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="username"
            value={newUserData.username}
            label="Username"
            onChange={handleNewUserDataChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="mobile"
            value={newUserData.mobile}
            label="Mobile"
            onChange={handleNewUserDataChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="roleKey-label">Role</InputLabel>
            <Select
              labelId="roleKey-label"
              id="roleKey"
              value={newUserData.roleKey}
              onChange={handleNewUserDataChange}
              name="roleKey"
            >
              {roles.map((role) => (
                <MenuItem key={role.roleKey} value={role.roleKey}>
                  {role.roleLabel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            name="password"
            value={newUserData.password}
            label="Password"
            type="password"
            onChange={handleNewUserDataChange}
          />
          <Button onClick={addUserHandler} variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
