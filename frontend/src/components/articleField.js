import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditButton from './EditButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ArticleField = (props) => {
    const classes = useStyles();

    const onClickDelete = (value) => {
        axios.delete(`/articles?title=${value}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

return (
    <Grid container
        direction="column"
        justify="flex-start"
        alignItems="stretch" spacing={3}>

        {props.articles.map(option => (
            <Grid  item >
                <Paper >
                    <Typography variant="h4">{option.title}</Typography>
                    <Typography variant="h5">{option.description}</Typography>
                    <Typography variant="body1">{option.content}</Typography>

                    <Grid
                        container
                        direction="row">

                        <EditButton message="Edit Article"/>

                        <Button  variant="outlined"
                            className={classes.button} 
                            startIcon={<DeleteIcon />} 
                            onClick={event => onClickDelete(option.title)}></Button>
                    </Grid>
                </Paper>   
            </Grid>
                ))}
            
    </Grid>
    );
}

export default ArticleField;