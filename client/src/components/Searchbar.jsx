import React, { useState } from "react";
import { Box, InputBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/slice/searchTerm";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // handling input change
  const handleChange = (e) => {
    setSearch(e.target.value);

    // dispatching searchterm
    dispatch(
      setSearchTerm({
        searchTerm: e.target.value,
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <InputBase
        placeholder="Search by name, email or role"
        value={search}
        onChange={handleChange}
        sx={{
          border: "1px solid #c4c4c4",
          width: "100%",
          pl: "1rem",
          borderRadius: "3px",
        }}
      />
    </Box>
  );
};

export default Searchbar;
