function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0; 
  for(let i = 0; i < books.length; i++) {
    for(let j = 0; j <books[i].borrows.length; j++) {
      const borrows = books[i].borrows[j];
      if (borrows.returned === false){
      count++;
      }
    }
  }
  return count;
}

function getMostCommonGenres(books) {  
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  //map over book genres
  bookGenres.map((genre) => {
    //for each genre, first check to see if genre already exists in array
    const genreLocation = temp.findIndex((element) => element.name === genre);
    //second, if it exists, increase count by 1
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
      //else, if it don't exist, push a new genre object onto array with count of 1
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;

}

function getMostPopularBooks(books) {
  let sortedByAmount = books.sort((a, b) => b.borrows.length - a.borrows.length);
  console.log(sortedByAmount);
  let results = sortedByAmount.map(book => { 
    return { name: book.title, count: book.borrows.length }; 
  }); 
  results.length = 5;
  return results;
}


function getAuthorById(authors, authorId) {
  //find the author id and use it later to match it with the books id to find the author later
  return authors.find((author) => author.id === authorId);
}

function getMostPopularAuthors(books, authors) {
  //create an empty array to hold the end result
  const bookAuthors = [];
  //for each book match the author id number with the book's author id 
  books.forEach((book) => {
    //the match will find the author id and match it to the book id
    const match = bookAuthors.find((author) => author.id === book.authorId);
    //if they match
    if (match) {
      //the match numbr will equal the book borrows number
      match.count += book.borrows.length;
    } else {
      //or get hte 
      const writer = getAuthorById(authors, book.authorId);
      const count = book.borrows.length;
      bookAuthors.push({
        name: `${writer.name.first} ${writer.name.last}`,
        count,
      });
    }
  });
  let result = bookAuthors.sort((authorA, authorB) =>
    authorA.count < authorB.count ? 1 : -1
  );
  result = result.slice(0, 5);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};