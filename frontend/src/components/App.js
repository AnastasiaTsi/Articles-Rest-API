import React, { useEffect, useState } from 'react';
import axios from "axios";
import SelectCategory from './Select'
import ArticleField from './articleField'


function App() {
  console.log('I WAS LOADED ');

  const [categoryNames, setOption] = useState(['Any']);      //state with the category names
  const [selectedCategory, setSelectedCategory] = useState('Any');     //category that is selected
  const [articles, setArticles] = useState(['-']);             // articles 
  const [categories, setCategories]  = useState({ _id: "0", name: "Any" }); 

  useEffect(() => {
    /**
    * axios - get request to our backend
    */
    getArticles();
    axios.get("/categories")
      .then(response => {
        console.log(response.data);
        const categoryResponse = response.data;

        //create array for the name of the categories and add "All" categories option { _id: "0", name: "Any" }
        var arrayNames = ['Any'];
        var arrayCategories = [{ _id: "0", name: "Any" }];
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

  function getArticles(){

    var categoryId;

    if (selectedCategory === "Any"){
      axios.get("/articles")
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
        if(selectedCategory == categories[i].name){
            categoryId = categories[i]._id;
        }
      }
      
      console.log(categoryId);
      axios.get(`/articles/?category=${categoryId}`)
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

  console.log('categoryNames');
  console.log(categoryNames);
  console.log(categories);

  return (
    <div className="App">
      <header className="App-header">

        <div className="select">
        <SelectCategory
        title="hello from app"
        option={selectedCategory}
        categoryOptions={categoryNames}
            onChange={event => setSelectedCategory(event.target.value)} />
        </div>

        <ArticleField articles={articles}/>

      </header>
    </div>
  );
}

export default App;