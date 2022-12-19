import React, {useState, useEffect} from 'react';
import './App.css';
import AppHeader from '../app-header/AppHeader.jsx';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function App() {
  const [ingridients, setIngridients] = useState([]);

  useEffect(() => {
      fetch('https://norma.nomoreparties.space/api/ingredients')
        .then((response) => response.json())
        .then((serverData) => setIngridients(serverData))
        .catch(() => console.log('Ошибка. Попробуйте обновить страницу.'));
    }, []);

  return (
    <AppHeader />
  )
}

export default App;
