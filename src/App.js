import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Dashboard from './Dashboard';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router'

class BooksApp extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then(books => {
      console.log('books: ', books);
      this.addBooksToState(books);
    });
  }

  addBooksToState = (books) => {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];

    books.forEach(book => {
        switch (book.shelf) {
          case 'currentlyReading':
            currentlyReading.push(book);
            break;
          case 'wantToRead':
            wantToRead.push(book);
            break;
          case 'read':
            read.push(book);
            break;
          default:
            break;
        }
    });

    this.setState({currentlyReading, wantToRead, read});
  }

  updateBookStatus = (event) => {
    const { book, shelf } = event;

    BooksAPI.update(book, shelf).then(() =>{
        this.getBooks();
      });
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/' 
          render={ ()=> 
            <Dashboard 
              currentlyReading={this.state.currentlyReading} 
              wantToRead={this.state.wantToRead} 
              read={this.state.read}
              updateBookStatus={(event) => this.updateBookStatus(event)}
              >
            </Dashboard> 
          }
        />
        <Route path='/search' 
          render={()=> 
            <SearchBooks
              updateBookStatus={(event) => this.updateBookStatus(event)}>
            </SearchBooks> } />
      </div>
    )

  }
}

export default BooksApp
