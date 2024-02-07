// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setEditRow, clearEditRow } from "../Store/editingSlice";
// import { deleteRole, selectRoles, updateRole } from "../Store/rolesSlice";
// import {
//   Box,
//   Button,
//   IconButton,
//   Modal,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import CheckIcon from "@mui/icons-material/Check";

// export default function RolePage() {
//   const roles = useSelector(selectRoles);
//   const editRowKey = useSelector((state) => state.editing);
//   const dispatch = useDispatch();
//   const [newRoleData, setNewRoleData] = useState({
//     roleLabel: "",
//     roleKey: "",
//   });
//   const [editRoleData, setEditRoleData] = useState({
//     roleLabel: "",
//     roleKey: "",
//   });
//   const [showAddFields, setShowAddFields] = useState(false);
//   const [deleteRoleKey, setDeleteRoleKey] = useState(null); // New state for tracking role key to delete

//   const setEdited = (roleKey) => {
//     setEditRoleData(roles.find((role) => role.roleKey === roleKey));
//     dispatch(setEditRow(roleKey));
//   };

//   const save = (roleKey) => {
//     dispatch(updateRole({ roleKey, updatedRole: editRoleData }));
//     dispatch(clearEditRow());
//   };

//   const handleEditRoleDataChange = (e) => {
//     const { name, value } = e.target;
//     setEditRoleData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleNewRoleDataChange = (e) => {
//     const { name, value } = e.target;
//     setNewRoleData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const addRoleHandler = () => {
//     dispatch(updateRole({ roleKey: newRoleData.roleKey, updatedRole: newRoleData }));
//     setNewRoleData({
//       roleLabel: "",
//       roleKey: "",
//     });
//     setShowAddFields(false);
//   };

//   const handleDelete = (roleKey) => {
//     setDeleteRoleKey(roleKey); // Set the role key to delete when delete button is clicked
//   };

//   const confirmDelete = () => {
//     if (deleteRoleKey !== null) {
//       dispatch(deleteRole(deleteRoleKey)); // Delete the role
//       setDeleteRoleKey(null); // Reset the role key to null after deletion
//     }
//   };

//   return (
//     <div className="App">
//       <div style={{ padding: "5%" }}>
//         <Box mb={2} display="flex" justifyContent="flex-end" spacing={10}>
//           <Button onClick={() => setShowAddFields(true)} variant="contained">
//             Add Role
//           </Button>
//         </Box>

//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Role Key</TableCell>
//                 <TableCell align="left">Role Label</TableCell>
//                 <TableCell align="left"></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {roles.map((role) => (
//                 <TableRow key={role.roleKey}>
//                   <TableCell component="th" scope="row">
//                     {editRowKey === role.roleKey ? (
//                       <TextField
//                         onChange={handleEditRoleDataChange}
//                         value={editRoleData.roleKey}
//                         name="roleKey"
//                       />
//                     ) : (
//                       role.roleKey
//                     )}
//                   </TableCell>
//                   <TableCell align="left">
//                     {editRowKey === role.roleKey ? (
//                       <TextField
//                         onChange={handleEditRoleDataChange}
//                         value={editRoleData.roleLabel}
//                         name="roleLabel"
//                       />
//                     ) : (
//                       role.roleLabel
//                     )}
//                   </TableCell>
//                   <TableCell align="left">
//                     {editRowKey === role.roleKey ? (
//                       <IconButton onClick={() => save(role.roleKey)}>
//                         <CheckIcon />
//                       </IconButton>
//                     ) : (
//                       <IconButton onClick={() => setEdited(role.roleKey)}>
//                         <EditIcon />
//                       </IconButton>
//                     )}
//                     <IconButton onClick={() => handleDelete(role.roleKey)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//       <Modal
//         open={showAddFields}
//         onClose={() => setShowAddFields(false)}
//         aria-labelledby="add-role-modal"
//         aria-describedby="add-role-form"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <TextField
//             fullWidth
//             margin="normal"
//             name="roleKey"
//             value={newRoleData.roleKey}
//             label="Role Key"
//             onChange={handleNewRoleDataChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             name="roleLabel"
//             value={newRoleData.roleLabel}
//             label="Role Label"
//             onChange={handleNewRoleDataChange}
//           />
//           <Button onClick={addRoleHandler} variant="contained" color="primary">
//             Add Role
//           </Button>
//         </Box>
//       </Modal>
//       {/* Deletion confirmation modal */}
//       <Modal
//         open={deleteRoleKey !== null}
//         onClose={() => setDeleteRoleKey(null)}
//         aria-labelledby="delete-role-modal"
//         aria-describedby="delete-role-form"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <p>Are you sure you want to delete this role?</p>
//           <Button onClick={confirmDelete} variant="contained" color="primary">
//             Yes
//           </Button>
//           <Button style={{marginLeft: '10px'}}  onClick={() => setDeleteRoleKey(null)} variant="contained" color="secondary">
//             Cancel
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditRow, clearEditRow } from "../Store/editingSlice";
import { deleteRole, selectRoles, updateRole } from "../Store/rolesSlice";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RolePage() {
  const roles = useSelector(selectRoles);
  const editRowKey = useSelector((state) => state.editing);
  const dispatch = useDispatch();
  const [newRoleData, setNewRoleData] = useState({
    roleLabel: "",
    roleKey: "",
  });
  const [editRoleData, setEditRoleData] = useState({
    roleLabel: "",
    roleKey: "",
  });
  const [showAddFields, setShowAddFields] = useState(false);
  const [deleteRoleKey, setDeleteRoleKey] = useState(null); // New state for tracking role key to delete

  const setEdited = (roleKey) => {
    setEditRoleData(roles.find((role) => role.roleKey === roleKey));
    dispatch(setEditRow(roleKey));
  };

  const save = (roleKey) => {
    dispatch(updateRole({ roleKey, updatedRole: editRoleData }));
    dispatch(clearEditRow());
  };

  const handleEditRoleDataChange = (e) => {
    const { name, value } = e.target;
    setEditRoleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewRoleDataChange = (e) => {
    const { name, value } = e.target;
    setNewRoleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addRoleHandler = () => {
    dispatch(
      updateRole({ roleKey: newRoleData.roleKey, updatedRole: newRoleData })
    );
    setNewRoleData({
      roleLabel: "",
      roleKey: "",
    });
    setShowAddFields(false);
  };

  const handleDelete = (roleKey) => {
    setDeleteRoleKey(roleKey); // Set the role key to delete when delete button is clicked
  };

  const confirmDelete = () => {
    if (deleteRoleKey !== null) {
      dispatch(deleteRole(deleteRoleKey)); // Delete the role
      setDeleteRoleKey(null); // Reset the role key to null after deletion
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    roleKey: Yup.string().required("Role Key is required"),
    roleLabel: Yup.string().required("Role Label is required"),
  });

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
                    {editRowKey === role.roleKey ? (
                      <TextField
                        onChange={handleEditRoleDataChange}
                        value={editRoleData.roleKey}
                        name="roleKey"
                      />
                    ) : (
                      role.roleKey
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRowKey === role.roleKey ? (
                      <TextField
                        onChange={handleEditRoleDataChange}
                        value={editRoleData.roleLabel}
                        name="roleLabel"
                      />
                    ) : (
                      role.roleLabel
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {editRowKey === role.roleKey ? (
                      <IconButton onClick={() => save(role.roleKey)}>
                        <CheckIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setEdited(role.roleKey)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDelete(role.roleKey)}>
                      <DeleteIcon />
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
          <Formik
            initialValues={{
              roleKey: "",
              roleLabel: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              addRoleHandler();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  name="roleKey"
                  label="Role Key"
                  value={newRoleData.roleKey}
                  onChange={handleNewRoleDataChange}
                />
                <ErrorMessage
                  component="div"
                  name="roleKey"
                  className="error"
                />

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  name="roleLabel"
                  label="Role Label"
                  value={newRoleData.roleLabel}
                  onChange={handleNewRoleDataChange}
                />
                <ErrorMessage
                  component="div"
                  name="roleLabel"
                  className="error"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Add Role
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      {/* Deletion confirmation modal */}
      <Modal
        open={deleteRoleKey !== null}
        onClose={() => setDeleteRoleKey(null)}
        aria-labelledby="delete-role-modal"
        aria-describedby="delete-role-form"
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
          <p>Are you sure you want to delete this role?</p>
          <Button onClick={confirmDelete} variant="contained" color="primary">
            Yes
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => setDeleteRoleKey(null)}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}




