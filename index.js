const {
  __,
  assoc,
  compose,
  has,
  identity,
  ifElse,
  isNil,
  lens,
  join,
  map,
  not,
  over,
  path,
  pipe,
  prop,
  props,
  propSatisfies,
  sortBy,
  toLower,
} = require('ramda');

const getSurname = path(['name', 'sur']);
const getSurnameLower = pipe(getSurname, toLower);
const sortBySurname = sortBy(getSurnameLower);

const getIdSetDateOfBirth = lens(prop('id'), assoc('dateOfBirth'));
const assocWithDateOfBirth = (datesOfBirth) =>
  over(getIdSetDateOfBirth, prop(__, datesOfBirth));
const hasDateOfBirth = propSatisfies(compose(not, isNil), 'dateOfBirth');

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
const assocWithAge = (person) =>
  assoc('age', calculateAge(person.referenceDate, person.dateOfBirth), person);

const getNameSetFormattedName = lens(prop('name'), assoc('formattedName'));
const fullName = pipe(props(['first', 'sur']), join(' '));

const buildAgeDescription = ({formattedName, age}) =>
  `${formattedName} is ${age} years old.`;
const buildAgeUnknownDescription = ({formattedName}) =>
  `${formattedName}'s age is unknown.`;

const getAgeDescriptions = (referenceDate, datesOfBirth, people) =>
  map(
    pipe(
      assoc('referenceDate', referenceDate),
      assocWithDateOfBirth(datesOfBirth),
      over(getNameSetFormattedName, fullName),
      ifElse(hasDateOfBirth, assocWithAge, identity),
      ifElse(has('age'), buildAgeDescription, buildAgeUnknownDescription)
    ),
    people
  );

module.exports = {
  sortBySurname,
  getAgeDescriptions,
};
