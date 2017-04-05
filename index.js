const {
  __,
  curry,
  path,
  pipe,
  prop,
  sortBy,
  toLower,
} = require('ramda');

const getSurname = path(['name', 'sur']);
const getSurnameLower = pipe(getSurname, toLower);
const sortBySurname = sortBy(getSurnameLower);

const getDateOfBirth = (datesOfBirth) => pipe(
  prop('id'),
  prop(__, datesOfBirth)
);
const extraYearForMonth = (dateOne, dateTwo) => {
  const monthDifference = dateOne.getMonth() - dateTwo.getMonth();
  return monthDifference < 0
    || (monthDifference === 0
      && dateOne.getDate() < dateTwo.getDate());
};
const calculateAge = (dateOne, dateTwo) =>
  dateOne.getFullYear()
    - dateTwo.getFullYear()
    - (extraYearForMonth(dateOne, dateTwo) ? 1 : 0);
const formatName = ({name}) => `${name.first} ${name.sur}`;
const getAgeDescription = curry((date, datesOfBirth, person) => {
  const dateOfBirth = getDateOfBirth(datesOfBirth)(person);
  return dateOfBirth
    ? `${formatName(person)} is ${calculateAge(date, dateOfBirth)} years old.`
    : `${formatName(person)}'s age is unknown.`;
});
const getAgeDescriptions = curry((date, datesOfBirth, people) =>
  people.map(getAgeDescription(date, datesOfBirth)));

module.exports = {
  sortBySurname,
  getAgeDescriptions,
};
