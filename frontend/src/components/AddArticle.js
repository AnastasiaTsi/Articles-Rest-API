import React, {useState}  from 'react';
import {ThemeProvider, makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';


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

    const [data, setData] = useState({title: '', categoryId: '', description:'', content: ''});
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = e => {
        console.log(e.id);
        setData({...data, [e.target.name] : e.target.value});
    }

    React.useEffect(()=> {console.log(data)},[data])

    const onClick = (event) => {
        axios.post("/articles", data)
        .then(function (response) {
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
        multiline
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
                        value={data.title}
                    />
                    <TextField 
                        className={classes.margin}
                        label="Category"
                        variant="outlined"
                        disabled 
                        value={props.categoryName}
                        name="category">

                    </TextField>
                    <TextField
                        className={classes.margin}
                        label="Description"
                        variant="outlined"
                        name="description"
                        multiline
                        onChange={event => setData(event.target.value)}
                    />
                    <TextField
                        className={classes.margin}
                        label="Content"
                        variant="outlined"
                        name="content"
                        multiline
                        onChange={event => setData(event.target.value)}
                    />
                </ThemeProvider>

                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button} 
                    onClick={event => onClick(event)}>
                    {props.message}
                </Button>
            </Grid>
        </form>
        </PaperModal>
    </Modal>
</div>
);
}
export default AddArticle;