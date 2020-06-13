import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

class DashBoard extends Component {

    render() {

      const { currentlyReading, wantToRead, read, updateBookStatus, loading } = this.props;

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title={'Currently Reading'} books={currentlyReading} updateBookStatus={(event) => updateBookStatus(event)} loading={loading}></BookShelf>
                <BookShelf title={'Want to Read'} books={wantToRead} updateBookStatus={(event) => updateBookStatus(event)} loading={loading}></BookShelf>
                <BookShelf title={'Read'} books={read} updateBookStatus={(event) => updateBookStatus(event)} loading={loading}></BookShelf>
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
  read: PropTypes.array.isRequired,
  updateBookStatus: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default DashBoard;