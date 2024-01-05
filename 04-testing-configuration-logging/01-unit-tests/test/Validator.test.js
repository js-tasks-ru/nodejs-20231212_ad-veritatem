const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Valid input checking', () => {
    describe('The validator checks a string field', () => {
      it('Check wrong types string validation', () => {
        const validator = new Validator({
          name: {
            type: 'string',
            min: 10,
            max: 20,
          },
        });

        const errors = validator.validate({name: 999999});

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got number');
      });

      it('Check short string validation', () => {
        const validator = new Validator({
          name: {
            type: 'string',
            min: 10,
            max: 20,
          },
        });

        const errors = validator.validate({name: 'Lalala'});

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 6');
      });

      it('Check long string validation', () => {
        const validator = new Validator({
          name: {
            type: 'string',
            min: 1,
            max: 5,
          },
        });

        const errors = validator.validate({name: 'Lalala'});

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('name');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too long, expect 5, got 6');
      });
    });

    describe('The validator checks a number field', () => {
      it('Check wrong type number validation', () => {
        const validator = new Validator({
          age: {
            type: 'number',
            min: 10,
            max: 27,
          },
        });

        const errors = validator.validate({age: '999999'});

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');
      });

      it('Check little number validation', () => {
        const validator = new Validator({
          age: {
            type: 'number',
            min: 10,
            max: 27,
          },
        });

        const errors = validator.validate({age: 9});

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too little, expect 10, got 9');
      });

      it('Check big number validation', () => {
        const validator = new Validator({
          age: {
            type: 'number',
            min: 10,
            max: 27,
          },
        });

        const errors = validator.validate({age: 55});

        expect(errors).to.have.length(1);
        expect(errors[0]).to.have.property('field').and.to.be.equal('age');
        expect(errors[0]).to.have.property('error').and.to.be.equal('too big, expect 10, got 55');
      });
    })
  });

  describe('Empty input validation', () => {
    it('validate empty type input', () => {
      const validator = new Validator({
        name: {
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({name: 'Lalala'});
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error')
          .and.to.be.equal('input type should be specified');
    });

    it('validate empty min input', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          max: 10,
        },
      });

      const errors = validator.validate({name: 'Lalala'});
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error')
          .and.to.be.equal('min value should be specified');
    });

    it('validate empty max input', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 20,
        },
      });

      const errors = validator.validate({name: 'Lalala'});
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error')
          .and.to.be.equal('max value should be specified');
    });
  });
});
