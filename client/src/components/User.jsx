import {
  Box,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const User = ({ name, email, role, onDelete, onSelect }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { checked } = e.target;
    setIsChecked(checked);
    onSelect(name, checked);
  };

  return (
    <UserWrapper>
      <Box>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleChange} />}
        />
      </Box>
      <Typography>{name}</Typography>
      <Typography>{email}</Typography>
      <Typography>{role}</Typography>
      <Box>
        <IconButton>
          <EditNoteIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteOutlineIcon style={{ color: "red" }} />
        </IconButton>
      </Box>
    </UserWrapper>
  );
};

export default User;

const UserWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: calc(10% - 1px);
  border-bottom: 1px solid #c4c4c4;
  align-items: center;
`;
