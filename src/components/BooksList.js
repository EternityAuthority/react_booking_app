import React, { useContext } from 'react';
import _ from 'lodash';
import Book from './Book';
import BooksContext from '../context/BooksContext';
import { Button } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse'

const BooksList = () => {
  const { books, setBooks } = useContext(BooksContext);

  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function (e) {

      console.log(reader.result)
      const results = Papa.parse(reader.result, { header: true })
      const rows = results.data
      console.log(rows)
      setBooks(rows);
    }
    reader.readAsText(files[0]);
  };

  return (
    <React.Fragment>
      <div className="book-list">
        {!_.isEmpty(books) ? (
          books.map((book) => (
            <Book key={book.id} {...book} handleRemoveBook={handleRemoveBook} />
          ))
        ) : (
          <p className="message">No books available. Please add some books.</p>
        )}
      </div>
      <div className="import-export">
        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
          <Button variant="success" >
            Import
          </Button>{' '}
        </ReactFileReader>

        <CSVLink
          data={books}
          filename={"book-list.csv"}
          className="btn btn-info"
          target="_blank"
        >
          Export
        </CSVLink>;

      </div>
    </React.Fragment>
  );
};

export default BooksList;