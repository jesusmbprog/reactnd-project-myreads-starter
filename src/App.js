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
    read: [],
    loading: false
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    this.updateLoadingStatus(true);
    BooksAPI.getAll().then(books => {
      console.log('books: ', books);
      this.addBooksToState(books);
      this.updateLoadingStatus(false);
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

    this.updateLoadingStatus(true);
    BooksAPI.update(book, shelf).then(() =>{
        this.updateLoadingStatus(false);
        this.getBooks();
      });
  }

  updateLoadingStatus = (value) => {
    this.setState({loading: value})
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
              loading={this.state.loading}
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
