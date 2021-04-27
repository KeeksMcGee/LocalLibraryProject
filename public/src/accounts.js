function findAccountById(accounts, id) {
  const found = accounts.find((account) => account.id === id);
 return found;
}

function sortAccountsByLastName(accounts) {
 const {nameA, nameB} = accounts;
 accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1 : - 1);
 return accounts;
}

function getTotalNumberOfBorrows(account, books) {
 let accumulator = 0;
 return books.reduce((acc, book) => {
   let borrowed = 0;
   acc += book.borrows.reduce((borrows, borrow) => 
  borrows += borrow.id === account.id ? 1: 0, borrowed);
   return acc;
 }, accumulator);
}

function getBooksPossessedByAccount(account, books, authors) {
 let booksPossessed = [];
 books.forEach(book => {
   if(book.borrows.find(item => item.id === account.id && item.returned === false)) {
     booksPossessed.push(book);
   }
 })
 booksPossessed.forEach(book => {
   let theAuthor = authors.find(person => person.id === book.authorId);
   book["author"] = theAuthor;
 })
 return booksPossessed;
 
}

module.exports = {
 findAccountById,
 sortAccountsByLastName,
 getTotalNumberOfBorrows,
 getBooksPossessedByAccount,
};