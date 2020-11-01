import React  from 'react';
import { Grid } from '@material-ui/core'
import MappedField from './mappedField'

const ArticleField = (props) => {
/**
 * Some how the .map overrides the variables inside the modal 
 * so i had to move everything in a component 
 */
return (
    <Grid container
        direction="column"
        justify="flex-start"
        alignItems="stretch" spacing={3}>

        {props.articles.map(option => (
            <MappedField reloadArticles={props.reloadArticles} option={option}/>
            ))}     
    </Grid>
    );
}

export default ArticleField;