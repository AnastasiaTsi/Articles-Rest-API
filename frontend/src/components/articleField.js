import React , {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, TextField, Paper, Grid, Typography, Modal, Backdrop } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        
    },
}));

const StyledBackdrop = withStyles({
    root: {
      backdropFilter: 'blur(7px) !important',
      backgroundColor: 'rgb(0, 0, 0, 0)',
    },
  })(Backdrop);

const ArticleField = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    var textFieldContent='';

    const handleChange = e => {
        console.log(e.target.value);
        textFieldContent = e.target.value;
    }
    const handleOpen = () => {
        setOpen(true);
      };
    
    const onClickDelete = (value) => {
        axios.delete(`/articles?title=${value}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const onClickEdit = ( id, category, description, title) => {
        axios.put(`/articles/${id}`,{
            "description": description,
            "title": title,
            "categoryId": category,
            "content": textFieldContent
        })
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
    <Grid container
        direction="column"
        justify="flex-start"
        alignItems="stretch" spacing={3}>

        {props.articles.map(option => (
            <Grid  item >
                <Paper style={{ padding: 20}}>
                    <Typography variant="h4">{option.title}</Typography>
                    <Typography variant="h5">{option.description}</Typography>
                    <Typography variant="body1">{option.content}</Typography>

                    <Grid container
                        direction="row">

                        <Button 
                            id="edit"
                            className={classes.margin}
                            label="Description"
                            variant="outlined"
                            onClick={handleOpen}>Edit Article</Button>

                        <Button  
                            variant="outlined"
                            className={classes.button} 
                            onClick={event => onClickDelete(option.title, option._id)}>
                            <DeleteIcon/>
                        </Button>

                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            BackdropComponent={StyledBackdrop}>

                            <PaperModal elevation={8}>
                                <Typography variant="h4">{option.title}</Typography>
                                <Typography variant="h5">{option.description}</Typography>

                                <TextField variant="outlined"
                                    fullWidth
                                    multiline
                                    style={{ margin: 8}}
                                    onChange={handleChange}
                                    defaultValue={option.content}>    
                                </TextField>

                                <Button  
                                    variant="outlined"
                                    className={classes.button} 
                                    onClick={e => onClickEdit(option._id, option.category, option.description, option.title)}>
                                    update article
                                </Button>
                            </PaperModal>
                        </Modal>
                    </Grid>
                </Paper>   
            </Grid>
            ))}     
    </Grid>
    );
}

export default ArticleField;