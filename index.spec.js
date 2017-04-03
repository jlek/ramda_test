const sut= require('./index.js');
require('chai').should();

describe('index.js', function() {
  it('exists.', function() {
    sut.should.exist;
  });
});
