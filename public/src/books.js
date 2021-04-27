function findAuthorById(authors, id) {
  const found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  const found = books.find((book) => book.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  let available = [];
  let unavailable = [];
  const bookStatus = [];
  
  //loop through the books
  books.forEach((book) => {
    //record the book's return status
    const isBookReturned = !book.borrows[0]["returned"];
    
    if (isBookReturned) {//if book is returned
      available.push(book);     
    } else { //if book is not returned
      unavailable.push(book);
    }
  });
  
  //push the arrays into the array we are returning
  bookStatus.push(available);
  bookStatus.push(unavailable);
  console.log(bookStatus);
  return bookStatus;
}

function getBorrowersForBook(book, accounts) {
  // `borrows` is a list of transactions, each of type { id: string, returned: true }
  const { borrows } = book;

  const borrowers = borrows.map(({ id, returned })=> {
    // find account that matches the borrower's ID
    const account = accounts.find(account => account.id === id);

    // return the matching account, along with the `returned` info
    return {
      ...account,
      returned,
    };
  });

  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);

  
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
