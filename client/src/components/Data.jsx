import React, { useEffect, useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import User from "./User";

const Data = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  let data = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm);

  const handleSelectUser = (name, checked) => {
    if (checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, name]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user !== name)
      );
    }
  };

  const handleDeleteUser = (name) => {
    setDeletedUsers((prevDeletedUsers) => [...prevDeletedUsers, name]);
  };

  useEffect(() => {
    const filteredUsers = data
      .filter(
        ({ name, role, email }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(({ name }) => !deletedUsers.includes(name));
    setFilteredData(filteredUsers);
  }, [data, searchTerm, deletedUsers]);

  return (
    <DataWrapper>
      <Box className="titles-container">
        <Typography className="titles">Select</Typography>
        <Typography className="titles">Name</Typography>
        <Typography className="titles">Email</Typography>
        <Typography className="titles">Role</Typography>
        <Typography className="titles">Actions</Typography>
      </Box>
      <Box className="users-container">
        {!isLoading &&
          filteredData.map(({ id, name, email, role }) => {
            return (
              <User
                key={id}
                name={name}
                email={email}
                role={role}
                onDelete={() => handleDeleteUser(name)}
                onSelect={handleSelectUser}
              />
            );
          })}
      </Box>
    </DataWrapper>
  );
};

export default Data;

const DataWrapper = styled(Box)`
  overflow: hidden;
  height: 100%;

  .titles-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    height: calc(9.09090909091% - 1px);
    border-bottom: 1px solid #c4c4c4;
    align-items: center;
  }

  .titles {
    font-weight: 600;
  }

  .users-container {
    height: calc(100% - 9.09090909091%);
  }
`;
