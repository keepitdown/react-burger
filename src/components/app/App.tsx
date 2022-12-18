import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function App() {
  fetch('https://norma.nomoreparties.space/api/ingredients')
    .then((resp) => resp.json())
    .then((data) => console.log(data));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button htmlType="button" type="primary" size="large" extraClass="mt-2">Кнопка</Button>
        <div className="mt-2 text text_type_main-large text_color_inactive">Текст</div>
      </header>
    </div>
  );
}

export default App;
