import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Pagination = () => {
  // state from redux
  const data = useSelector((state) => state.data);
  const searchTerm = useSelector((state) => state.searchTerm);

  return <Box>hello page</Box>;
};

export default Pagination;
