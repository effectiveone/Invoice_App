import React from "react";
import { useStatisticContext } from "../../model/useStatisticContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

const JpkTable = () => {
  const { jpk, sendToConsumerJPK } = useStatisticContext();
  const accordions = [];

  if (typeof jpk === "object") {
    const entries = Object.entries(jpk);
    for (const [prop, value] of entries) {
      const year = prop;

      const monthButtons = Object.entries(value).map(([month, data]) => (
        <ListItem key={month}>
          <ListItemText primary={`Month: ${month}`} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendToConsumerJPK(year, month)}
          >
            Send
          </Button>
        </ListItem>
      ));

      const accordion = (
        <Accordion key={year}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{year}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>{monthButtons}</List>
          </AccordionDetails>
        </Accordion>
      );
      accordions.push(accordion);
    }
  }

  return <div>{accordions}</div>;
};

export default JpkTable;
