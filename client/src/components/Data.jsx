import React, { useEffect, useState } from "react";
import { Box, styled, Typography, Button, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import User from "./User";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Data = () => {
  // State variables
  const [filteredData, setFilteredData] = useState([]); // Stores the filtered data
  const [deletedUsers, setDeletedUsers] = useState([]); // Stores the deleted users
  const [selectedUsers, setSelectedUsers] = useState([]); // Stores the selected users
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page number
  const usersPerPage = 10; // Number of users to display per page

  // Redux selectors
  let data = useSelector((state) => state.data.data); // Retrieves the data from Redux store
  const isLoading = useSelector((state) => state.data.isLoading); // Retrieves the loading state from Redux store
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm); // Retrieves the search term from Redux store

  // Handles selection of a user
  const handleSelectUser = (name, checked) => {
    if (checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, name]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user !== name)
      );
    }
  };

  // Handles deletion of selected users
  const handleDeleteSelectedUsers = () => {
    setDeletedUsers((prevDeletedUsers) => [
      ...prevDeletedUsers,
      ...selectedUsers,
    ]);
    setSelectedUsers([]); // Resets the selected users array
  };

  // Handles deletion of a single user
  const handleDeleteUser = (name) => {
    setDeletedUsers((prevDeletedUsers) => [...prevDeletedUsers, name]);
  };

  // Applies filtering and updates filteredData when data, searchTerm, or deletedUsers change
  useEffect(() => {
    // Filters data based on search term and excludes deleted users
    const filteredUsers = data
      .filter(
        ({ name, role, email }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(({ name }) => !deletedUsers.includes(name));

    setFilteredData(filteredUsers); // Updates the filteredData state with the filtered users
  }, [data, searchTerm, deletedUsers]);

  // Paginates the filtered data
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  // Calculates the total number of pages
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  // Handles page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <DataWrapper>
      <Box className="titles-and-users-container">
        <Box className="titles-container">
          <Typography className="titles">
            Select{filteredData.length + " " + currentPage}
          </Typography>
          <Typography className="titles">Name</Typography>
          <Typography className="titles">Email</Typography>
          <Typography className="titles">Role</Typography>
          <Typography className="titles">Actions</Typography>
        </Box>
        <Box className="users-container">
          {!isLoading &&
            currentUsers.map(({ id, name, email, role }) => {
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
      </Box>
      <Box className="page-navigation-container">
        <Button
          className="delete-selected-users-btn"
          onClick={handleDeleteSelectedUsers}
        >
          Delete Selected
        </Button>
        <Box className="page-numbers-container">
          <IconButton
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <IconButton
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <IconButton
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </IconButton>
          ))}
          <IconButton
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
          <IconButton
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    </DataWrapper>
  );
};

export default Data;

const DataWrapper = styled(Box)`
  .titles-and-users-container {
    height: 82vh;
  }

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

  .page-navigation-container {
    height: 9vh;
    display: flex;
    align-items: center;
  }

  .delete-selected-users-btn {
    background-color: #ff3f3f;
    color: white;
  }

  .delete-selected-users-btn:hover {
    background-color: #ff3f3f;
  }
`;
