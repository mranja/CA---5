import React from 'react';

const books = ({ books, searchTerm }) => {
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="books">
      <ul className="Grid">
        {filteredBooks.map((book) => (
          <li key={book.id} className="BookItem">
            <img src={book.imageLinks.thumbnail} alt={book.title} />
            <div>
              <strong>{book.title}</strong> <br /><br />
              by {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
              <br /><br />
              Published: {new Date(book.publishedDate).toLocaleDateString()}
              <br /><br />
              Price: {book.price ? `$${book.price}` : 'Free'}
              <br /><br />
              Rating: {book.averageRating ? `${book.averageRating}⭐ ` : 'N/A'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default books;

