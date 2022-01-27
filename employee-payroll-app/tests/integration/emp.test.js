import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import employeeDB from './emp.test.json';
chai.should();

chai.use(chaiHttp);

describe('Employee APIs Test', () => {
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

  describe('New Employee Api', () => {
    it('GivenAddEmployeeDetails_WhenNotProper_shouldReturninTokenRequired', (done) => {
      const newEmployee = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .post('/api/v1/employees')
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Authorization token is required');
          done();
        });
    });
    it('GivenAddEmployeeDetails_WhenProper_shouldReturnSuccess', (done) => {
      const token = employeeDB.login.validToken;
      const newEmployee = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .post('/api/v1/employees')
        .set({ authorization: token })
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Employee Added successfully');
          done();
        });
    });
    it('GivenAddEmployeeDetails_WhenNotProper_shouldReturn_Email_Already_Exist', (done) => {
      const token = employeeDB.login.validToken;
      const newEmployee = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .post('/api/v1/employees')
        .set({ authorization: token })
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('Employee Email Already Exist');
          done();
        });
    });
    it('GivenAddEmployeeDetails_WhenNotProper_shouldReturn_firstName_Required"', (done) => {
      const token = employeeDB.login.validToken;
      const newEmployee = {
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .post('/api/v1/employees')
        .set({ authorization: token })
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('GivenAddEmployeeDetails_WhenNotProper_shouldReturn_firstName_length_must_be_at_least_2_characters"', (done) => {
      const token = employeeDB.login.validToken;
      const newEmployee = {
        firstName: 'M',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .post('/api/v1/employees')
        .set({ authorization: token })
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('GivenAddEmployeeDetails_WhenNotProper_shouldReturn_Email_fails_to_match_the_Required"', (done) => {
      const token = employeeDB.login.validToken;
      const newEmployee = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996gmailcom',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .post('/api/v1/employees')
        .set({ authorization: token })
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('GivenAddEmployeeDetails_WhenNotProper_shouldReturn_Gender_fails_to_match_the_Required"', (done) => {
      const token = employeeDB.login.validToken;
      const newEmployee = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmailcom',
        gender: 'Male',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .post('/api/v1/employees')
        .set({ authorization: token })
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe('Get All Employee Api', () => {
    it('GivenGetAllEmployeeDetails_WhenNotProper_shouldReturninTokenRequired', (done) => {
      chai
        .request(app)
        .get('/api/v1/employees')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Authorization token is required');
          done();
        });
    });
    it('GivenGetAllEmployeeDetails_WhenProper_shouldReturnSuccess', (done) => {
      const token = employeeDB.login.validToken;
      chai
        .request(app)
        .get('/api/v1/employees')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Geting All Employee Successfully');
          done();
        });
    });
    it('GivenGetAllEmployeeDetails_WhenNotProper_shouldReturninvalidToken', (done) => {
      const token = employeeDB.login.invalidToken;
      chai
        .request(app)
        .get('/api/v1/employees')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').eql('invalid token');
          done();
        });
    });
  });
});
