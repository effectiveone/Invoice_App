import React from "react";
import { useStatisticContext } from "../../Context/useStatisticContext";
import { LineChart } from "./LineChart";
import Pagination from "@mui/material/Pagination";
import { usePagination } from "../../Hook/usePagination";

export const TotalYearsChart = () => {
  const { dataForYears } = useStatisticContext();
  const { currentPage, startIndex, endIndex, pageSize, handleChangePage } =
    usePagination(2);

  const chartsToDisplay = dataForYears
    ?.slice()
    .reverse()
    .slice(startIndex, endIndex);
  return (
    <>
      <LineChart chartsToDisplay={chartsToDisplay} />
      <Pagination
        count={Math.ceil(dataForYears?.length / pageSize)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </>
  );
};
