import React, {useState, useEffect} from 'react';
import './App.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function App() {
  fetch('https://norma.nomoreparties.space/api/ingredients')
    .then((resp) => resp.json())
    .then((data) => console.log(data));
  return (
    <div></div>
  );
}

export default App;
