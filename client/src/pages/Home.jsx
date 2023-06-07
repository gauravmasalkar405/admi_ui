import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import Searchbar from "../components/Searchbar";
import Data from "../components/Data";
import Pagination from "../components/Pagination";
import { fetchData } from "../redux/slice/userData";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  // dispatch action --> fetch data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <HomeWrapper>
      <Box className="search-bar">
        <Searchbar />
      </Box>
      <Box className="user-data">
        <Data />
      </Box>
      <Box className="pagination">
        <Pagination />
      </Box>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled(Box)`
  padding: 0px 30px;

  .search-bar {
    height: 9vh;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .user-data {
    height: 82vh;
  }

  .pagination {
    height: 9vh;
  }
`;
