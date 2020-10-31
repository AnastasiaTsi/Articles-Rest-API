import React, { useEffect, useState } from 'react';
import axios from "axios";
import SelectCategory from './Select'
import ArticleField from './articleField'
import AddArticle from './AddArticle'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const App = ()=> {
  console.log('I WAS LOADED ');
  var textFieldContent='';
  const [categoryNames, setOption] = useState(['All']);      //state with the category names
  const [selectedCategory, setSelectedCategory] = useState("All");     //category that is selected
  const [articles, setArticles] = useState(['-']);             // articles 
  const [categories, setCategories]  = useState({ _id: "0", name: "All" }); 
  const [content, setContent] = useState(true); //show content or not
  const [categoryId, setCategoryId] = useState('0') // categoryID --- den douleuei akoma

  /**
   * useEffect is called at the first load of the page
   */
  useEffect(() => {
    getArticles();
    getCategories()
  }, []);

  /**
   * useEffect to reload page with articles from a category
   */
  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  /**
   * useEffect useEffect to reload page with or without content articles
   */
  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

/**
 * getArticles returns articles 
 */
  const getArticles = () => {
    console.log("selectedCategory");
    console.log(selectedCategory);
    console.log(selectedCategory === "All");
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
      findCategoryId();
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
  
const onClick = (event) => {
  if(content){
    setContent(false)
    //contentText = 'Show Content';
  }
  else{
    setContent(true);
    //contentText = 'Hide Content';
  }
}

const findCategoryId = () =>{
  for(var i = 0; i < categories.length; i++){
    if(selectedCategory === categories[i].name){
      setCategoryId(categories[i]._id);
    }
  }
}

const reloadCategories = (event) =>{
  getCategories();
}

  /**
   * 
   * @param {what is written in the textField} e 
   * e gets saved at the textFieldContent variable
   */
  const handleTextField = e => {
    textFieldContent = e.target.value;
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
          onClick={event => onClick(event) }>
          Hide/Show Content
        </Button>
      </Grid>
      <Grid>
      <TextField id="filled-basic" label="search" onChange={handleTextField} ></TextField>
      <Button padding="12px" color="primary"> Search article </Button>
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
          <SelectCategory 
              categoryNames={categoryNames}
              reloadCategories={event => reloadCategories(event)}
              onChange={event => setSelectedCategory(event.target.value)} />

          <AddArticle categoryName={selectedCategory} findCategoryId={findCategoryId} message="Add new Article"/>
          
        </Grid>
      </Grid>
    </Grid>

  );
}
export default App;



//gia to edit sto arthro tha iparxei hidden textfiled me submit pou tha kanei
//axios put kai tha kribete to h2

