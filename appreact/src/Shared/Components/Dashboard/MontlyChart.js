import React from "react";
import { Grid, Typography, Pagination } from "@mui/material";
import { t } from "i18next";
import { useStatisticContext } from "../../Context/useStatisticContext";
import { usePagination } from "../../Hook/usePagination";
import { BarChart } from "./BarChart";

export const MontlyChart = () => {
  const { salesByMonth } = useStatisticContext();
  const { currentPage, startIndex, endIndex, pageSize, handleChangePage } =
    usePagination(1);

  const yearlySalesKeys = Object.keys(salesByMonth?.yearlySales || {});
  const pagedYearlySalesKeys = yearlySalesKeys
    ?.slice()
    .reverse()
    .slice(startIndex, endIndex);

  return (
    <>
      <Grid container spacing={2}>
        {pagedYearlySalesKeys.map((year) => (
          <Grid item xs={12} key={year}>
            <Typography variant="h6">
              {t("salesByMonth")} {year}
            </Typography>
            <Grid container spacing={2}>
              {salesByMonth?.yearlySales[year].map((salesData, index) => (
                <Grid item xs={4} key={index}>
                  <BarChart salesData={salesData} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(yearlySalesKeys.length / pageSize)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </>
  );
};
