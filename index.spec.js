require('chai').should();
const {sortBySurname} = require('./index.js');
const people = [
  {
    name: {
      first: 'Blaise',
      sur: 'Zabini',
    },
  },
  {
    name: {
      first: 'Hannah',
      sur: 'Abbott',
    },
  },
  {
    name: {
      first: 'Ernie',
      sur: 'Macmillan',
    },
  },
];

describe('index.js', function() {
  describe('sortBySurname', function() {
    it('can sort a list of people by name', function() {
      const expected = [
        {name: {first: 'Hannah', sur: 'Abbott'}},
        {name: {first: 'Ernie', sur: 'Macmillan'}},
        {name: {first: 'Blaise', sur: 'Zabini'}},
      ];
      sortBySurname(people).should.deep.equal(expected);
    });
  });
});
