import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import faker from 'faker';
import app from '../../src/index';

chai.should();

chai.use(chaiHttp);

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Registration Api', () => {
    it('GivenRegistrationDetails_WhenProper_shouldReturnSuccess', (done) => {
      const register = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/register')
        .send(register)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('User created successfully');
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_Email_Already_Exist', (done) => {
      const register = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/register')
        .send(register)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('Email Already Exist');
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_firstName_Required"', (done) => {
      const register = {
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/register')
        .send(register)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_firstName_length_must_be_at_least_2_characters"', (done) => {
      const register = {
        firstName: 'm',
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/register')
        .send(register)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_Email_fails_to_match_the_Required"', (done) => {
      const register = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'mandeepgmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/register')
        .send(register)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
