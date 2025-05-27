import React from "react";
import { Grid, Box } from "@material-ui/core";
import { Divider } from "@mui/material";
import { t } from "i18next";
import Dates from "./Dates";
import ClientDetails from "./ClientDetails";
import Table from "./Table";
import Notes from "./Notes";
import { Footer } from "../Common/Footer";
import { useInvoiceContext } from "../../../../../entities/invoice/model/useInvoiceContext";

const SimpleInvoiceTemplate = () => {
  const {
    componentRef,
    companyData,
    selectedKontrahent,
    currentInvoiceNumber,
  } = useInvoiceContext();

  return (
    <div ref={componentRef} className="p-5">
      <ClientDetails
        title={null}
        companyName={companyData.companyName}
        legalForm={companyData.legalForm}
        zip={companyData.zipCode}
        city={companyData.city}
        street={companyData.street}
        nip={companyData.nip}
      />
      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>
          {" "}
          {t("invoice")} {currentInvoiceNumber}
        </p>
      </Box>
      <Dates />
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ClientDetails
            title={t("seller")}
            companyName={companyData.companyName}
            legalForm={companyData.legalForm}
            zip={companyData.zipCode}
            city={companyData.city}
            street={companyData.street}
            nip={companyData.nip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ClientDetails
            title={t("buyer")}
            companyName={selectedKontrahent?.kontrahent_companyName}
            legalForm={selectedKontrahent?.kontrahent_legalForm}
            zip={selectedKontrahent?.kontrahent_zipCode}
            city={selectedKontrahent?.kontrahent_city}
            street={selectedKontrahent?.kontrahent_street}
            nip={selectedKontrahent?.kontrahent_nip}
          />
        </Grid>
      </Grid>
      <Divider />
      <Table />
      <Notes />
      <Footer />
    </div>
  );
};

export default SimpleInvoiceTemplate;
