import React, {useState} from 'react';
import { makeStyles , withStyles } from '@material-ui/core/styles';
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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const StyledBackdrop = withStyles({
    root: {
      backdropFilter: 'blur(7px) !important',
      backgroundColor: 'rgb(0, 0, 0, 0)',
    },
  })(Backdrop);

const SelectCategory =(props) => {
    const classes = useStyles();
    /** useState'value' is the value of the bullet menu*/
    const [value, setValue] = useState('All');
    /** useState 'open' is used to open and close the modal*/
    const [open, setOpen] = useState(false);
    /**
     * when the text on the etxtField is changed
     * it gets saved at the 'textFieldContent' variable
     */
    var textFieldContent='';
    
    /**
     * 
     * @param {what is written in the textField} e 
     * e gets saved at the textFieldContent variable
     */
    const handleTextField = e => {
        textFieldContent = e.target.value;
    }

    /**
     * onClick is on the 'add' button and will 
     * .post the name of the new category using the
     * textFieldContent variable
     */
    const onClickAdd = (event) => {
        axios.post("/categories",{
            "name": textFieldContent
        })
        .then(function (response) {
            console.log(response);
            props.reloadCategories(textFieldContent);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    /**
     * omClickDelete is on the trashcan icon button
     * will take the value = the name of the article
     * and will do .delete using the name of the category
     */
    const onClickDelete = (event) => {
        axios.delete(`/categories?name=${value}`)
        .then(function (response) {
            setValue('All');
            props.reloadCategories(value);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    /**
     * handleChange sets the value of 'value' to the selected bullet
     * @param {The bullet that is curently selected} event 
     */
    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    };

    const PaperModal = withStyles({
        root: {
          outline: 'none',
          padding: 20,
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          maxWidth: 450,
          maxHeight: 450,
          margin: 'auto',
          position: 'absolute',
          overflowY: 'auto',
          overflowX: 'hidden',
        },
      })(Paper);

      const handleOpen = () => {
        setOpen(true);
      };
    return (

        <FormControl variant="outlined">

            <InputLabel id="inputLabel">Category</InputLabel>
                <Select
                    value={props.option}
                    label="category"
                    onChange={props.onChange}>
                    {props.categoryNames.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>

                <Button id="edit"
                    className={classes.margin}
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}>Edit Categories</Button>
                
                <Modal open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    BackdropComponent={StyledBackdrop}>

                    <PaperModal elevation={8}>

                    <Grid container
                    direction="column">
                        <TextField className={classes.margin}
                            label="Category"
                            variant="outlined"
                            id="category"
                            onChange={handleTextField}/>

                        <Button size="small"
                            variant="contained"
                            color="primary"
                            className={classes.button} 
                            onClick={event => onClickAdd(event)}>Add</Button>

                        <RadioGroup aria-label="categories" value={value} onChange={event => handleChange(event)}>
                            {props.categoryNames.map(option => (
                                <FormControlLabel  value={option} control={<Radio />} label={option} />
                        ))}
                        </RadioGroup>

                        <Button variant="outlined"
                            className={classes.button} 
                            startIcon={<DeleteIcon />} 
                            onClick={event => onClickDelete(event)}></Button>
                    </Grid>
                </PaperModal>
            </Modal>
        </FormControl>
    );
}

export default SelectCategory;