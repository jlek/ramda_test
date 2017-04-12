require('chai').should();
const {sortBySurname, getAgeDescriptions} = require('./index.js');

const blaise = {
  id: 0,
  name: {
    first: 'Blaise',
    sur: 'Zabini',
  },
};
const hannah = {
  id: 1,
  name: {
    first: 'Hannah',
    sur: 'Abbott',
  },
};
const ernie = {
  id: 2,
  name: {
    first: 'Ernie',
    sur: 'Macmillan',
  },
};
const people = [blaise, hannah, ernie];

describe('index.js', function() {
  describe('sortBySurname', function() {
    it('can sort a list of people by name', function() {
      // Act & Assert
      sortBySurname(people).should.deep.equal([hannah, ernie, blaise]);
    });
  });

  describe('getAgeDescriptions', function() {
    it('can produce descriptions of people\'s ages.', function() {
      // Arrange
      const currentDate = new Date(2017, 3, 4);
      const peopleDateOfBirth = {};
      peopleDateOfBirth[blaise.id] = new Date(1979, 8, 2);
      peopleDateOfBirth[ernie.id] = new Date(1980, 3, 21);

      // Act
      const ageDescriptions = getAgeDescriptions(
        currentDate,
        peopleDateOfBirth,
        people);

      // Assert
      ageDescriptions.should.deep.equal([
        'Blaise Zabini is 37 years old.',
        'Hannah Abbott\'s age is unknown.',
        'Ernie Macmillan is 36 years old.',
      ]);
    });
  });
});
