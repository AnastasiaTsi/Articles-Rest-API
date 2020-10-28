//export default class ArticleField extends React.Component {}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function FullWidthGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="flex-start" spacing={3}>

                <Grid item xs>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>

                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography></Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}