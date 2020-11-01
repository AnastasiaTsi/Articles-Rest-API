import React, {useState}  from 'react';
import {ThemeProvider, makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import axios from "axios";
import { Select, MenuItem, Paper, Modal, Backdrop, Button, Grid, TextField } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
        margin: {
        margin: theme.spacing(1),
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

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const AddArticle = (props) => {
    const classes = useStyles();
    /** data variable changes when the user types something on the textFields
     *  or selects category. Holds the object that we are going to post as a new article  */ 
    var data = {title: '', categoryId: 'select category', description:'', content: ''};
    /**useState to open and close the modal */
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    /**
    * find from category name its Id
    */
    const findCategoryId = () =>{
        var categoryId = '';
        for(var i = 0; i < props.categories.length; i++){
        if(data.categoryId === props.categories[i].name){
            categoryId = props.categories[i]._id;
            data= {...data, categoryId : categoryId };
            break;
        }
        }
    }

    /**
     * handleChange is setting the variable data depending on what 
     * the user has typed in the textFields
     * @param {what is written on the textField} e 
     */
    const handleChange = e => {
        data= {...data, [e.target.name] : e.target.value};
    }

    /**
     * onClick uses axios to post the new article 
     */
    const onClick = (e) => {
        axios.post("/articles", data)
        .then(function (response) {
            setOpen(false)
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

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

return (
    <div>
    <Button 
        id="add"
        variant="contained"
        color="primary"
        className={classes.margin}
        onClick={handleOpen}>Add Article</Button>
    
    <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropComponent={StyledBackdrop}>  
            <PaperModal elevation={8}>

            <form onChange={handleChange}className={classes.root} noValidate>
                <Grid container direction="column">

                <ThemeProvider theme={theme}>
                    <TextField 
                        className={classes.margin}
                        label="Title"
                        name="title"
                    />
                <Select name="categoryId" onChange={handleChange} variant="outlined" label="categories">
                    {props.categoryNames.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>

                    <TextField
                        className={classes.margin}
                        label="Description"
                        variant="outlined"
                        name="description"
                        multiline
                    />
                    <TextField
                        className={classes.margin}
                        label="Content"
                        variant="outlined"
                        name="content"
                        multiline
                    />
                </ThemeProvider>

                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button} 
                    onClick={event => onClick(event)}>
                    Add new article
                </Button>
            </Grid>
        </form>
        </PaperModal>
    </Modal>
</div>
);
}
export default AddArticle;