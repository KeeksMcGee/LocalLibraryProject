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
 const accId = account.id;
 let total = 0; 
 books.forEach(book => book.borrows.forEach(borrow => accId === borrow.id && total++));
 return total
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
