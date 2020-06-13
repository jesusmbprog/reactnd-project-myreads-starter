import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  BookCard from './BookCard';

class BookShelf extends Component {

    render() {

        const { title, books, updateBookStatus, loading } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                    { loading 
                    ?   <div className="bookshelf-loading">
                            <div className="bookshelf-loader"></div>
                        </div>
                    :   <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map((book)=>
                                    <li key={book.id}>
                                        <BookCard  book={book}  updateBookStatus={(event) => updateBookStatus(event)}></BookCard>
                                    </li>
                                )}
                            </ol>
                        </div>
                    }

            </div>
        );

    }

}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateBookStatus: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

export default BookShelf;