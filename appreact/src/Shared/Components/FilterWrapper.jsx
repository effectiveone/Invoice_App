import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import Container from '@mui/material/Container'
import { FilterListIcon, SearchIcon }
    from "../Utils/Icons"
import { useStyles } from "./StyleFilterWrapper"
import { t } from "i18next"


const FilterWrapper = ({
    // selected,
    handleFilterChange }) => {
    const classes = useStyles()
    return (
        <Container maxWidth="xl" >
            <div className={classes.root}>
                <Grid container className={classes.wrapper}>
                    <Grid className={classes.flexbox}>
                        <Grid className={classes.filter}>
                            <Button className={classes.button} variant="contained" startIcon={<FilterListIcon sx={{ p: 0 }} className={classes.icon} />}>
                                {t("filter")}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid className={classes.searchContainer}>
                        <SearchIcon />
                        <InputBase
                            className={classes.input}
                            placeholder="Search by kontrahent's company name"
                            onChange={({ target: { value } }) => handleFilterChange(value)}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default FilterWrapper