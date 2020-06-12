import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Dashboard from './Dashboard';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={()=> <Dashboard></Dashboard> } />
          <Route path='/search' render={()=> <SearchBooks></SearchBooks> } />
      </div>
    )
  }
}

export default BooksApp
