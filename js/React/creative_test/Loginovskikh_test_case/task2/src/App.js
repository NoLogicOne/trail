import React, { Component } from 'react';
import './App.css';

import Table from "./Table/Table.js";

const DATA = [
  {id: 1, name: "Вася", date:"15.06.2018", count: 11},
  {id: 2, name: "Петя", date:"23.11.2018", count: 23},
  {id: 3, name: "Иван", date:"12 марта 2017", count: 3},
  {id: 4, name: "Александр", date: "20/12/2010", count: 1},
  {id: 5, name: "Евгений", date:"12.09.2018", count: 112},
  {id: 6, name: "Мария", date:"1.08.2016", count: 122},
  {id: 7, name: "Анастасия", date:"20.11.2018", count: 34},
  {id: 8, name: "Степан", date:"12.11.2019", count: 10}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App_header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h3>
            React.js
          </h3>
        </header>
        <Table data={DATA} />
      </div>
    );
  }
}

export default App;

/*
Есть массив объектов:

[
{id: 1, name: "Вася", date:"15.06.2018", count: 11},
{id: 2, name: "Петя", date:"23.11.2018", count: 23},
{id: 3, name: "Иван", date:"12 марта 2017", count: 3},
{id: 4, name: "Александр", date: "20/12/2010", count: 1},
{id: 5, name: "Евгений", date:"12.09.2018", count: 112},
{id: 6, name: "Мария", date:"1.08.2016", count: 122},
{id: 7, name: "Анастасия", date:"20.11.2018", count: 34},
{id: 8, name: "Степан", date:"12.11.2019", count: 10},
]


Сделать функционал:
Таблица с данными
Выбор поля
Сортировка по выбранному полю (больше/меньше/без сортировки)
Поиск по выбранному столбцу всех возможных совпадений

Это задание можно делать различными способами, на ваше усмотрение.
Можно по выбору использовать - React/Vue/Angular/jq/js. В зависимости от того, на каком стеке планируете работать.
*/