const {path, pipe, sortBy, toLower} = require('ramda');

const getSurname = path(['name', 'sur']);
const getSurnameLower = pipe(getSurname, toLower);
const sortBySurname = sortBy(getSurnameLower);

module.exports = {
  sortBySurname,
};
