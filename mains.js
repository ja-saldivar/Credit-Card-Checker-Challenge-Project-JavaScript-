// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

//check array length if even from where to start multiplying
const even = (a, newArray) => {
  for (let i = a.length - 1; i >= 0; i--) {
    if (i % 2 === 0) {                //if index is even, multiply by 2 and push
      newArray.unshift(a[i] * 2);
    } else {                          //else push
      newArray.unshift(a[i]);
    }
  }
};
//check array length if uneven from where to start multiplying
const unEven = (a, newArray) => {
  for (let i = a.length - 1; i >= 0; i--) {
    if (i % 2 !== 0) {                //if index is uneven, multiply by 2 and push
      newArray.unshift(a[i] * 2);
    } else {
      newArray.unshift(a[i]);         //else push
    }
  }
};
//implement previous functions
const validateCred = a => {
  const arrayByTwo = [];
  const length = a.length;
  if (length % 2 === 0) {
    even(a, arrayByTwo);
  } else {
    unEven(a, arrayByTwo);
  }
  const arrayInUnits = arrayByTwo.map(value => value > 9 ? value - 9 : value);    //check double digits
  const arraySum = arrayInUnits.reduce((a, b) => a + b);                          //sum all digits
  const checkDigit = arraySum % 10 === 0;                                         //check modulo 10 if equals 0
  return checkDigit;                                                              //return true or false for card
};
//make valid and invalid arrays
const findInvalidCards = batch => {
  const validCards = [];
  const invalidCards = [];
  batch.forEach(value => validateCred(value) ? validCards.push(value) : invalidCards.push(value));  //check every in/valid card of an array
  return invalidCards;                                                                              //return just invalidCards array
};
//make array of companies
const idInvalidCardCompanies = a => {
  const invalidCards = findInvalidCards(a);                           //pass parameter(array) to findInvalidCards func and get invalidCards
  const companies = ['Amex', 'Visa', 'Mastercard', 'Discover'];                       
  const invalidCompanies = [];
  invalidCards.forEach(card => {
    switch (card[0]) {                                                //switch for first digit of invalidCards to check companie
      case 3:
        invalidCompanies.indexOf(companies[0]) === -1 ? invalidCompanies.push(companies[0]) : '';   //if indexOf returns -1
        break;                                                                                      //(index not found)
      case 4:                                                                                       //means company is not presesnt
        invalidCompanies.indexOf(companies[1]) === -1 ? invalidCompanies.push(companies[1]) : '';   //in invalidCompanies
        break;                                                                                      //and pushes company
      case 5:                                                                                       //else nothing
        invalidCompanies.indexOf(companies[2]) === -1 ? invalidCompanies.push(companies[2]) : '';
        break;
      case 6:
        invalidCompanies.indexOf(companies[3]) === -1 ? invalidCompanies.push(companies[3]) : '';
        break;
      default:
        console.log('Company not found');                                                           //default print
    };
  });
  return invalidCompanies;                                                                          //returns invlaidCompanies array
};

const stringToNumbers = string => {               //accepts string
  const cardArray = [];                           
  for (let i = 0; i < string.length; i++) {       //iterates through each char
    cardArray.push(Number(string[i]));            //transform string to number and pushes
  }
  return cardArray;                               //returns credit card array
}

console.log(stringToNumbers('5470467022369632'));
console.log(idInvalidCardCompanies(batch));
