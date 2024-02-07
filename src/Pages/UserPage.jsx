import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditRow, clearEditRow } from "../Store/editingSlice";
import { selectRoles } from "../Store/rolesSlice";
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validation = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  username: Yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
  mobile: Yup.string().required("Mobile number is required").matches(/^[0-9]+$/, "Mobile number must contain only digits"),
  roleKey: Yup.string().required("Role is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export default function UserPage() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const editRow = useSelector((state) => state.editing);
  const roles = useSelector(selectRoles);
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
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = (id) => {
    dispatch(deleteUser(id));
    setDeleteConfirmation(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const setEdited = (id) => {
    dispatch(setEditRow(id));
  };

  const save = () => {
    dispatch(editUser(editRow));
    dispatch(clearEditRow());
  };

  const handleEditDataChange = (e, id) => {
    const { name, value } = e.target;
    const updatedUserData = {
      ...users.find((user) => user.id === id),
      [name]: value,
    };
    dispatch(editUser(updatedUserData));
  };

  const addUserHandler = (values) => {
    const newId = users.length + 1;
    const newUser = { id: newId, ...values };
    dispatch(addUser(newUser));
    setShowAddFields(false);
  };

  return (
    <div >
      <div style={{ padding: "5%" }}>
        <h2>User List</h2>
        <Box mb={2} display="flex" justifyContent="flex-end" spacing={10}>
          <Button onClick={() => setShowAddFields(true)} variant="contained">
            Add User
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/edit-roles")}
            variant="contained"
          >
            Edit roles
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>{Headings()}</TableHead>
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
                        <InputLabel id={`roleKey-label-${item.id}`}>Role</InputLabel>
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
                      roles.find((role) => role.roleKey === item.roleKey)?.roleLabel
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
      {modalContainer()}
      {deleteConfirmation && (
        <Modal
          open={true}
          onClose={cancelDelete}
          aria-labelledby="delete-confirmation-modal"
          aria-describedby="delete-confirmation-message"
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
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <Button onClick={() => confirmDelete(deleteConfirmation)}>Yes</Button>
            <Button onClick={cancelDelete}>No</Button>
          </Box>
        </Modal>
      )}
    </div>
  );

  function Headings() {
    const headings = [
      { label: "ID" },
      { label: "Name", align: "left" },
      { label: "Email", align: "left" },
      { label: "Username", align: "left" },
      { label: "Mobile", align: "left" },
      { label: "Role", align: "left" },
      { label: "Actions", align: "left" },
    ];
  
    return (
      <TableRow>
        {headings.map((heading, index) => (
          <TableCell key={index} align={heading.align || "left"} className="table-header-cell">
           <span style={{color: 'white'}} > {heading.label}</span>
          </TableCell>
        ))}
      </TableRow>
    );
  }
  

  function modalContainer() {
    return (
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
          <Formik
            initialValues={{
              name: "",
              email: "",
              username: "",
              mobile: "",
              roleKey: "",
              password: "",
            }}
            validationSchema={validation}
            onSubmit={(values, { resetForm }) => {
              addUserHandler(values);
              resetForm();
            }}
          >
            <Form>
              <Field fullWidth margin="normal" name="name" as={TextField} label="Name" />
              <ErrorMessage name="name" component="div" />

              <Field fullWidth margin="normal" name="email" as={TextField} label="Email" />
              <ErrorMessage name="email" component="div" />

              <Field fullWidth margin="normal" name="username" as={TextField} label="Username" />
              <ErrorMessage name="username" component="div" />

              <Field fullWidth margin="normal" name="mobile" as={TextField} label="Mobile" />
              <ErrorMessage name="mobile" component="div" />

              <Field
                fullWidth
                margin="normal"
                name="password"
                as={TextField}
                label="Password"
                type="password"
              />
              <ErrorMessage name="password" component="div" />

              <FormControl fullWidth margin="normal">
                <InputLabel id="roleKey-label">Role</InputLabel>
                <Field as={Select} name="roleKey" labelId="roleKey-label">
                  {roles.map((role) => (
                    <MenuItem key={role.roleKey} value={role.roleKey}>
                      {role.roleLabel}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="roleKey" component="div" />
              </FormControl>

              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    );
  }
}
