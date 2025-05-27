import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
  },
  containerInputs: {
    display: "flex",
    flexDirection: "row",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    "& label": {
      marginBottom: theme.spacing(1),
      fontWeight: "bold",
    },
    "& input": {
      marginBottom: theme.spacing(2),
      padding: "10px",
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: "4px",
      transition: "all 0.3s ease-in-out",
      "&:focus": {
        outline: "none",
        boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(10),
  },
}));
export default function TableForm({
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
}) {
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      console.log("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount,
      };
      setDescription("");
      setQuantity("");
      setPrice("");
      setAmount("");
      setList([...list, newItems]);
      setIsEditing(false);
    }
  };

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
        setTotal(sum);
      }
    }
  });

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  // Delete function
  const deleteRow = (id) => setList(list.filter((row) => row.id !== id));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box className={classes.containerInputs}>
          <Grid>
            <TextField
              label="Item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Item description"
              variant="outlined"
              margin="normal"
            />
          </Grid>

          <Grid>
            <TextField
              label="Quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              variant="outlined"
              margin="normal"
            />
          </Grid>

          <Grid>
            <TextField
              label="Price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Box>

        <Grid>
          <TextField
            label="Amount"
            type="text"
            value={amount}
            disabled
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.submitButton}
        >
          {isEditing ? "Editing Row Item" : "Add Table Item"}
        </Button>
      </form>
      {/* Table items */}

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Description</TableCell>
              <TableCell className={classes.tableHeader}>Quantity</TableCell>
              <TableCell className={classes.tableHeader}>Price</TableCell>
              <TableCell className={classes.tableHeader}>Amount</TableCell>
              <TableCell className={classes.tableHeader}></TableCell>
              <TableCell className={classes.tableHeader}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(({ id, description, quantity, price, amount }) => (
              <TableRow key={id}>
                <TableCell>{description}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell className={classes.tableAmount}>{amount}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => editRow(id)}>
                    <AiOutlineEdit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => deleteRow(id)}>
                    <AiOutlineDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classes.totalContainer}>
        <Typography variant="h4" component="h2" className={classes.total}>
          PLN {total.toLocaleString()}
        </Typography>
      </div>
    </>
  );
}
