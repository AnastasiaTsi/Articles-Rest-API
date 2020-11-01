import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Grid, TextField } from '@material-ui/core'
import SelectCategory from './Select'
import ArticleField from './articleField'
import AddArticle from './AddArticle'

const App = ()=> {
  /** useState of the category that is currently selected */
  const [selectedCategory, setSelectedCategory] = useState("All");     //category that is selected
  /* useState to store what is types in the searchBar*/
  const [textFieldContent, setTextFieldContent] = useState('') 
  /* useState to store flag. Flag will either get all articles or the one searched*/
  const [oneArticle, setOneArticle] = useState(false);
  /** useState to store flag. Flag will either show content or hide it */
  const [content, setContent] = useState(true); 
  /** useState with the categoryNames */
  const [categoryNames, setOption] = useState(['All']);
  /** useState with the article objects */
  const [articles, setArticles] = useState(['-']);
  /** useState with the category Objects. The object { _id: "0", name: "All" } doesnt
   * exist in the database but its added for visual purposes */
  const [categories, setCategories]  = useState({ _id: "0", name: "All" }); 


  /**
   * useEffect is called at the first load of the page
   */
  useEffect(() => {
    getArticles();
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * useEffect to reload page with articles from a category
   */
  useEffect(() => {
    getArticles();
    console.log('inside use effect');
    console.log(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  /**
   * useEffect useEffect to reload page with or without content articles
   */
  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneArticle]);

/**
 * getArticles returns articles 
 */
const getArticles = () => {
  /* if we only want one article*/
  if(oneArticle){
    axios.get(`/articles/${textFieldContent}?flag=${content}`)
    .then(response => {
      setArticles(response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log("Problem With Response ", error.response.status);
      } else if (error.request) {
        console.log("Problem With Request ");
      } else {
        console.log("we have an error " + error);
      }
    });
  }else{
    if (selectedCategory === "All"){
      axios.get(`/articles?flag=${content}`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.log("Problem With Response ", error.response.status);
        } else if (error.request) {
          console.log("Problem With Request ");
        } else {
          console.log("we have an error " + error);
        }
      });
    }else{
      var categoryId = findCategoryId();
      axios.get(`/articles/?category=${categoryId}&flag=${content}`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.log("Problem With Response ", error.response.status);
        } else if (error.request) {
          console.log("Problem With Request ");
        } else {
          console.log("we have an error " + error);
        }
      });
    }
  }
}

  const getCategories = () => {
    axios.get("/categories")
    .then(response => {
      const categoryResponse = response.data;
      //create array for the name of the categories and add "All" categories option { _id: "0", name: "Any" }
      var arrayNames = ['All'];
      var arrayCategories = [{ _id: "0", name: "All" }];
      //populate array
      for (var i = 0; i < categoryResponse.length; i++) {
        arrayNames.push(categoryResponse[i].name);
        arrayCategories.push(categoryResponse[i]);
      }
      
      setOption(arrayNames);
      setCategories(arrayCategories);
    })

    .catch(error => {
      if (error.response) {
        console.log("Problem With Response ", error.response.status);
      } else if (error.request) {
        console.log("Problem With Request ");
      } else {
        console.log("we have an error " + error);
      }
    });
}
  
/**
 * onClick changes the 'content' flag
 * depending on the flag the content will be shown
 */
const onClickHideShow = (e) => {
  if(content){
    setContent(false)
  }
  else{
    setContent(true);
  }
}

/**
 * onClickSearch changes the 'OneArticle' flag
 * depending on the flag get requests searches for a specific
 * article 
 */
const onClickSearch = (e) => {
  if(oneArticle){
    setOneArticle(false)
  }
  else{
    setOneArticle(true);
  }
  getArticles();
}

/**
 * find from category name its Id
 */
const findCategoryId = () =>{
  var categoryId = '';
  for(var i = 0; i < categories.length; i++){
    if(selectedCategory === categories[i].name){
      categoryId = categories[i]._id;
    }
  }
  return categoryId;
}


const reloadCategories = (e) =>{
  getCategories();
}

  /**
   * 
   * @param {what is written in the textField} e 
   * e gets saved at the textFieldContent variable
   */
  const handleTextField = e => {
    setTextFieldContent( e.target.value);
    console.log(textFieldContent);
  }

  return (
  <Grid container
    direction="column"
    justify="space-between"
    alignItems= "center">

      <Grid item>
        <Button variant="contained"
          color="primary"
          onClick={event => onClickHideShow(event) }>
          Hide/Show Content
        </Button>
      </Grid>

      <Grid>
        <TextField id="filled-basic" label="search" onChange={handleTextField} ></TextField>
        <Button padding="30px" color="primary" onClick={event => onClickSearch(event) }> Search article </Button>
      </Grid>

      <Grid 
        item
        container
        direction="row"
        justify="space-around">
        <Grid item xs={7}>
          <ArticleField articles={articles}/>
        </Grid>
        <Grid item xs={3}>
          <SelectCategory categories={categories}
              categoryNames={categoryNames}
              value={selectedCategory}
              reloadCategories={event => reloadCategories(event)}
              onChange={event => setSelectedCategory(event.target.value)} />
          <AddArticle categories={categories} selectedCategory={selectedCategory} categoryNames={categoryNames.slice(1,categoryNames.length)}/>
        </Grid>
      </Grid>

    </Grid>

  );
}
export default App;



//gia to edit sto arthro tha iparxei hidden textfiled me submit pou tha kanei
//axios put kai tha kribete to h2

//  articles/test?flag=false