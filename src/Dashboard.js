import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

class DashBoard extends Component {

    render() {

      const { currentlyReading, wantToRead, read } = this.props;

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title={'Currently Reading'} books={currentlyReading}></BookShelf>
                <BookShelf title={'Want to Read'} books={wantToRead}></BookShelf>
                <BookShelf title={'Read'} books={read}></BookShelf>
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