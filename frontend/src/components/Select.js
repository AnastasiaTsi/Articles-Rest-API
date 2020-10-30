import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const SelectCategory =(props) => {
    const classes = useStyles();
    const[name, setName] = useState();
    const[value, setValue] = React.useState('All');

    
    const onClickAdd = (event) => {
        axios.post("/categories",{
            "name": name
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const onClickDelete = (event) => {
        axios.delete(`/categories?name=${value}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    };
    return (

            <FormControl variant="outlined">

                <InputLabel id="inputLabel">Category</InputLabel>
                    <Select
                        value={props.option}
                        label="category"
                        onChange={props.onChange}>
                        {props.categoryOptions.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    <Grid container
                        direction="column">
                        <TextField className={classes.margin}
                            label="Category"
                            variant="outlined"
                            id="category"
                            onChange={event => setName(event.target.value)}/>

                        <Button size="small"
                            variant="contained"
                            color="primary"
                            className={classes.button} 
                            onClick={event => onClickAdd(event)}>add</Button>

                        <RadioGroup aria-label="categories" value={value} onChange={event => handleChange(event)}>
                            {props.categoryOptions.map(option => (
                                <FormControlLabel value={option} control={<Radio />} label={option} />
                        ))}
                        </RadioGroup>

                        <Button variant="outlined"
                        className={classes.button} 
                        startIcon={<DeleteIcon />} 
                        onClick={event => onClickDelete(event)}></Button>
                    </Grid>

                </FormControl>
    );
}

export default SelectCategory;