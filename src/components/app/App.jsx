import React, {useState, useEffect} from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function App() {

  const [ingridientsData, setIngridientsData] = useState([]);

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

    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((response) => response.json())
      .then((serverData) => {
        const processedData = groupByType(serverData.data);
        setIngridientsData(processedData);
      })
      .catch(() => console.log('Ошибка. Попробуйте обновить страницу.'));
    }, []);
    

  return (
    <>
      <AppHeader/>
      <AppMain ingridientsData={ingridientsData} />
    </>
  )
}

export default App;