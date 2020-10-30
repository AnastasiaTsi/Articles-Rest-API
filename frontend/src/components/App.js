import React, { useEffect, useState } from 'react';
import axios from "axios";
import SelectCategory from './Select'
import ArticleField from './articleField'
import AddArticle from './AddArticle'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



function App() {
  console.log('I WAS LOADED ');

  const [categoryNames, setOption] = useState(['All']);      //state with the category names
  const [selectedCategory, setSelectedCategory] = useState('All');     //category that is selected
  const [articles, setArticles] = useState(['-']);             // articles 
  const [categories, setCategories]  = useState({ _id: "0", name: "All" }); 
  const [content, setContent] = useState(true); //show content or not
  const [categoryId, setCategoryId] = useState('0') // categoryID --- den douleuei akoma

  useEffect(() => {
    /**
    * axios - get request to our backend
    */
    getArticles();
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
  }, []);

  useEffect(() => {

    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {

    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  function getArticles(){

    var categoryId;

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
      for(var i = 0; i < categories.length; i++){
        if(selectedCategory === categories[i].name){
            categoryId = categories[i]._id;
        }
      }
      
      console.log(categoryId);
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

const onClick = (event) => {
  if(content){setContent(false)}
  else{setContent(true)}
}

// -----------------------------------------
const categorySelected = (event) => {
  setSelectedCategory(event);
  getCategoryId();
}

const getCategoryId = () => {
  for(var i; i< categories.length; i++){
    if(selectedCategory == categories[i].name){
      console.log('yay yay');
      setCategoryId(categories[i]._id);
    }
  }
}
//-----------------------------------

  return (

  <header className="App-header">
    <Grid container alignItems="row"></Grid>
    <Button variant="contained"
      color="primary"
      onClick={event => onClick(event)}>Show</Button>
      <Grid xs={3}>
        <AddArticle categoryName={selectedCategory} categoryId={categoryId} message="Add new Article"></AddArticle>

        <SelectCategory
          option={selectedCategory}
          categories={categories}
          categoryOptions={categoryNames}
          onChange={event => setSelectedCategory(event.target.value)} ></SelectCategory>
      </Grid>
      <Grid xs={7}>
        <ArticleField articles={articles}/>
      </Grid>
  </header>

  );
}
export default App;



//gia to edit sto arthro tha iparxei hidden textfiled me submit pou tha kanei
//axios put kai tha kribete to h2

