const {curry, flip, map, path, pipe, prop, sortBy, toLower} = require('ramda');

const getSurname = path(['name', 'sur']);
const getSurnameLower = pipe(getSurname, toLower);
const sortBySurname = sortBy(getSurnameLower);

const getId = prop('id');
const calculateYearDifference = (dateOne, dateTwo) => {
  let yearDifference = dateOne.getFullYear() - dateTwo.getFullYear();
  const monthDifference = dateOne.getMonth() - dateTwo.getMonth();
  if (
    monthDifference < 0
    || (monthDifference === 0 && dateOne.getDate() < dateTwo.getDate())
  ) {
    yearDifference--;
  }
  return yearDifference;
};
// const calculateAge = (date, dateOfBirth) => 38; // TODO
const formatName = ({name}) => `${name.first} ${name.sur}`;
const getAgeDescription = curry((date, datesOfBirth, person) => {
  const dateOfBirth = pipe(
    getId,
    flip(prop)(datesOfBirth)
  )(person);

  return dateOfBirth
    ? `${formatName(person)} is ${calculateYearDifference(date, dateOfBirth)} years old.`
    : `${formatName(person)}'s age is unknown.`;
});
const getAgeDescriptions = curry((date, datesOfBirth, people) => {
  return map(getAgeDescription(date, datesOfBirth), people);
});

module.exports = {
  sortBySurname,
  getAgeDescriptions,
};
