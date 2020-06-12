import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  BookCard from './BookCard';
import PropTypes from 'prop-types';

class DashBoard extends Component {

    render() {
      
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.currentlyReading.map((book)=>
                        <li key={book.id}>
                          <BookCard 
                            book={book}
                          ></BookCard>
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.wantToRead.map((book)=>
                        <li key={book.id}>
                          <BookCard 
                            book={book}
                          ></BookCard>
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.read.map((book)=>
                        <li key={book.id}>
                          <BookCard 
                            book={book}
                          ></BookCard>
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <Link to='/search'>
                <div className="open-search">
                  <button >Add a book</button>
                </div>
            </Link>
          </div>
        )

    }

}

DashBoard.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired
}

export default DashBoard;