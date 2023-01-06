import React, { useState, useEffect } from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import ErrorMessage from '../error-message/error-message';

const requestUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [ingredientsData, setIngredientsData] = useState({});
  const [requestHasFailed, setRequestHasFailed] = useState(false);

  useEffect(() => {

    function groupByType(serverData) {
      return serverData.reduce((processedData, currentItem) => {
        const itemType = currentItem.type;
        const updatedGroup = itemType in processedData 
          ? [...processedData[itemType], currentItem]
          : [currentItem];
        return {...processedData, [itemType]: updatedGroup}
      }, {})
    }

    fetch(requestUrl)
      .then((response) => response.json())
      .then((serverData) => {
        const processedData = groupByType(serverData.data);
        setIngredientsData(processedData);
      })
      .catch(() => {
        setRequestHasFailed(true);
        console.log('Error: data request has failed');
      });
    }, []);

  return (
    <>
      <AppHeader/>
      {!requestHasFailed 
        ? (<AppMain ingredientsData={ingredientsData} />)
        : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
      }
    </>
  )
}

export default App;
