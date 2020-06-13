import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import * as BooksAPI from './BooksAPI';
import BookCard from './BookCard';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

    state = {
      searchTerm: '',
      foundBooks: [],
      loading: false
    }

    onChangeInput = (query) => {
      this.setState(()=> ({
        searchTerm: query
      }));
      this.updateQuery(query);
    }

    updateQuery = _.throttle((query) => {
      this.searchFromAPI(query);
    }, 1000, { trailing: true });

    searchFromAPI = (query) =>{
      if(query !== ''){
        this.updateLoadingStatus(true);
        BooksAPI.search(query).then((res)=>{
          if(!res.error){
            this.setState({foundBooks: res})
          } else{
            this.setState({foundBooks: []})
          }
          this.updateLoadingStatus(false);
        })
      }
    }

    updateLoadingStatus = (value) => {
      this.setState({loading: value})
    }

    render() {
      
      const { updateBookStatus } = this.props;
      const { searchTerm, foundBooks, loading } = this.state;

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <form>
                <input type="text" placeholder="Search by title or author"
                  value={searchTerm}
                  onChange={(event) => this.onChangeInput(event.target.value.trim())}
                />
                </form>
              </div>
            </div>
            <div className="search-books-results">
              { loading 
              ? <div className="bookshelf-loading">
                  <div className="bookshelf-loader"></div>
                </div>
              : <ol className="books-grid">
                  {foundBooks && foundBooks.map((book)=>
                      <li key={book.id}>
                          <BookCard  book={book}  updateBookStatus={(event) => updateBookStatus(event)}></BookCard>
                      </li>
                  )}
                </ol>
              }
            </div>
          </div>
        )
    }

}

SearchBooks.propTypes = {
  updateBookStatus: PropTypes.func.isRequired
}

export default SearchBooks;