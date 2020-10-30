import React, {useState}  from 'react';
import {ThemeProvider, makeStyles, createMuiTheme,} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from "axios";


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

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const AddArticle = (props) => {
    const classes = useStyles();

    const[title, setTitle] = useState();
    const[categoryId, setCategoryId] = useState('5f998977c512fb4548facd76');
    const[description, setDescription] = useState();
    const[content, setContent] = useState();

    const onChange = (event) => {
        console.log(event.id);
    }

    const onClick = (event) => {
        axios.post("/articles",{
            "title": title,
            "categoryId": categoryId,
            "description": description,
            "content": content
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

return (
    <form onSubmit={props.handleSubmit} className={classes.root} noValidate>

    <Grid container direction="column">
    <ThemeProvider theme={theme}>
        <TextField
            className={classes.margin}
            label="Title"
            id="title"
            onChange={event => setTitle(event.target.value)}
        />
        <TextField className={classes.margin}
            label="Category"
            variant="outlined"
            disabled 
            defaultValue={props.categoryName}
            id="category">kg
        </TextField>
        <TextField
            className={classes.margin}
            label="Description"
            placeholder="haha"
            variant="outlined"
            id="description"
            multiline
            onChange={event => setDescription(event.target.value)}
        />
        <TextField
            className={classes.margin}
            label="Content"
            variant="outlined"
            id="content"
            multiline
            onChange={event => setContent(event.target.value)}
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
);
}
export default AddArticle;