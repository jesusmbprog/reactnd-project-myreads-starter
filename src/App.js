import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Dashboard from './Dashboard';
import SearchBooks from './SearchBooks';
import { Route, Switch } from 'react-router';
import NotFound from './NotFound';

class BooksApp extends React.Component {

  state = {
    allBooksInShelf: [],
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
      this.addBooksToState(books);
      this.updateLoadingStatus(false);
    });
  }

  addBooksToState = (books) => {
    const allBooksInShelf = books;
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

    this.setState({currentlyReading, wantToRead, read, allBooksInShelf});
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

    const { currentlyReading, wantToRead, read, loading, allBooksInShelf } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path='/' 
            render={ ()=> 
              <Dashboard 
                currentlyReading={currentlyReading} 
                wantToRead={wantToRead} 
                read={read}
                updateBookStatus={(event) => this.updateBookStatus(event)}
                loading={loading}
                >
              </Dashboard> 
            }
          />
          <Route path='/search' 
            render={()=> 
              <SearchBooks
                allBooksInShelf={allBooksInShelf}
                updateBookStatus={(event) => this.updateBookStatus(event)}>
              </SearchBooks> } />
          <Route path='*' component={NotFound}/>
        </Switch>
      </div>
    )

  }
}

export default BooksApp
