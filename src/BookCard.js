import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookCard extends Component {

    render() {

      const { book, updateBookStatus } = this.props;
      const { title, authors, imageLinks } = book;

        return (
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${imageLinks.thumbnail}')` }}></div>
              <div className="book-shelf-changer">
                <select onChange={(event) => updateBookStatus({shelf: event.target.value,book: book})}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
          </div>
        );
    };
}

BookCard.propTypes = {
  book:  PropTypes.object.isRequired,
  updateBookStatus: PropTypes.func.isRequired
};

export default BookCard;