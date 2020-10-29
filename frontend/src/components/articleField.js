import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteButton from './DeleteButton'
import EditButton from './EditButton';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));

export default class FullWidthGrid extends React.Component {
 //   const classes = useStyles();

render() {
    return (
        <div >
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="flex-start" spacing={3}>

                    <Grid container wrap="nowrap" spacing={2}>

                    {this.props.articles.map(option => (
                        <Grid item xs>
                            <h1>{option.title}</h1>
                            <h4>{option.description}</h4>
                            <Typography>{option.content}</Typography>
                            <EditButton/>
                            <DeleteButton/>
                        </Grid>
                        ))}
                        

                    </Grid>
                

            </Grid>
        </div>
    );
}
}