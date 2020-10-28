import React, { useEffect, useState } from 'react';
import axios from "axios";
import SelectCategory from './Select'
import ArticleField from './articleField'


function App() {
  console.log('I WAS LOADED ');

  const [categoryOptions, setOption] = useState(['Any']);      //state with the category names
  const [selectedCategory, setCategory] = useState('Any');    //category that is selected
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    /**
    * axios - get request to our backend
    */
    const getCategoryResponse = axios.get("/categories");
    const getArticleResponse = axios.get("/articles");
    axios.all([getCategoryResponse, getArticleResponse])
      .then(axios.spread((...responses) => {
        const categoryResponse = responses[0].data;
        const articleResponse = responses[1].data;

        console.log('articleResponse');
        console.log(articleResponse);

        //create array for the name of the categories and add "All" categories option { _id: "0", name: "Any" }
        var array = ['Any'];
        //populate array
        for (var i = 0; i < categoryResponse.length; i++) {
          array.push(categoryResponse[i].name);
        }
        setOption(array);
        setArticles(articleResponse);
      }))

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

  function setCurrency(value) {
    console.log('i was selected');
    setCategory(value);
  }


  console.log(`selectedCategory - ${selectedCategory}`);
  console.log("categoryOptions - " + categoryOptions);

  return (
    <div className="App">
      <header className="App-header">

        <div className="select">
          <SelectCategory
            title="hello from app"
            option={selectedCategory}
            categoryOptions={categoryOptions}
            onChange={event => setCurrency(event.target.value)}
          />
        </div>

        <ArticleField />

      </header>
    </div>
  );
}

export default App;