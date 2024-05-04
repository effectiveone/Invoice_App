import React from "react";
import ReactApexChart from "react-apexcharts";
import { Grid, Typography } from "@material-ui/core";
import { t } from "i18next";

export const LineChart = ({ chartsToDisplay }) => {
  return (
    <Grid container spacing={2}>
      <Typography variant="h6">{t("salesByYear")}</Typography>
      {chartsToDisplay?.map((date) => (
        <Grid item xs={6} key={date.year}>
          <ReactApexChart
            options={{
              chart: {
                type: "pie",
              },
              labels: date.keys,
              title: {
                text: `${t("chartByYear")} ${date.year}`,
              },
            }}
            series={date.values}
            type="pie"
            width={400}
          />
        </Grid>
      ))}
    </Grid>
  );
};
