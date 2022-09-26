import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import "./Table.css";

const UserRow = ({ data, handleDelete, handleEdit, handleCheck }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentValue({ ...currentValue, [name]: value });
  };

  const performEdit = () => {
    setCanEdit(true);
  };

  const handleSave = () => {
    setCanEdit(false);
    handleEdit(currentValue);
  }
  // currentValue["isChecked"]= data.isChecked;
  return (
    <tr key={data.id} className={data.isChecked ? "selected" : ""} >
      <td>
        <input
          type="checkbox"
          onChange={(e) => handleCheck(e, data.id)}
          checked={data.isChecked ? "checked" : ""}
        />
      </td>
      <td>
        {canEdit === true ? (
          <input
            type="text"
            name="name"
            value={currentValue.name}
            onChange={handleChange}
          />
        ) : (
          data.name
        )}
      </td>
      <td>
        {canEdit === true ? (
          <input
            type="email"
            name="email"
            value={currentValue.email}
            onChange={handleChange}
          />
        ) : (
          data.email
        )}
      </td>
      <td>
        {canEdit === true ? (
          <input
            type="text"
            name="role"
            value={currentValue.role}
            onChange={handleChange}
          />
        ) : (
          data.role
        )}
      </td>
      <td className="actions">
        {canEdit === false ? (
          <EditIcon onClick={performEdit} />
        ) : (
          <SaveIcon onClick={handleSave}/>
        )}
        <DeleteIcon onClick={() => handleDelete(data.id)} />
      </td>
    </tr>
  );
};
// handleEdit(data.id)
export default UserRow;
