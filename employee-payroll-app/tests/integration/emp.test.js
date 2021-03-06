import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
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
  describe('Get Employee By Id Api', () => {
    it('GivenGetEmployeeByIdDetails_WhenNotProper_shouldReturninTokenRequired', (done) => {
      chai
        .request(app)
        .get('/api/v1/employees/61ef9d9e5d571f1d64f43008')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Authorization token is required');
          done();
        });
    });
    it('GivenGetEmployeeByIdDetails_WhenProper_shouldReturnSuccess', (done) => {
      const token = employeeDB.login.validToken;
      chai
        .request(app)
        .get('/api/v1/employees/61ef9d9e5d571f1d64f43008')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Employee fetched successfully');
          done();
        });
    });
    it('GivenGetEmployeeByIdDetails_WhenNotProper_shouldReturninvalidToken', (done) => {
      const token = employeeDB.login.invalidToken;
      chai
        .request(app)
        .get('/api/v1/employees/61ef9d9e5d571f1d64f43008')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('message').eql('invalid token');
          done();
        });
    });
    it('GivenGetEmployeeByIdDetails_WhenProper_shouldReturn_Id_Not_Found', (done) => {
      const token = employeeDB.login.validToken;
      chai
        .request(app)
        .get('/api/v1/employees/61ef9d9e5d571f1d64f43000')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql(' Id Not Found');
          done();
        });
    });
  });
  describe('Update Employee Api', () => {
    it('GivenUpdateEmployeeDetails_WhenNotProper_shouldReturninTokenRequired', (done) => {
      const updateEmployee = {
        firstName: 'deep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 400000,
        department: 'frontend'
      };
      chai
        .request(app)
        .put('/api/v1/employees/61f131aab710b22b48dc8874')
        .send(updateEmployee)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Authorization token is required');
          done();
        });
    });
    it('GivenUpdateEmployeeDetails_WhenProper_shouldReturnSuccess', (done) => {
      const token = employeeDB.login.validToken;
      const updateEmployee = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 4000,
        department: 'backend'
      };
      chai
        .request(app)
        .put('/api/v1/employees/61f131aab710b22b48dc8874')
        .set({ authorization: token })
        .send(updateEmployee)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Employee updated successfully');
          done();
        });
    });
    it('GivenUpdateEmployeeDetails_WhenNotProper_shouldReturn_firstName_Required"', (done) => {
      const token = employeeDB.login.validToken;
      const updateEmployee = {
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .put('/api/v1/employees/61f131aab710b22b48dc8874')
        .set({ authorization: token })
        .send(updateEmployee)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('GivenUpdateEmployeeDetails_WhenNotProper_shouldReturn_firstName_length_must_be_at_least_2_characters"', (done) => {
      const token = employeeDB.login.validToken;
      const updateEmployee = {
        firstName: 'M',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        gender: 'M',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .put('/api/v1/employees/61f131aab710b22b48dc8874')
        .set({ authorization: token })
        .send(updateEmployee)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('GivenUpdateEmployeeDetails_WhenNotProper_shouldReturn_Gender_fails_to_match_the_Required"', (done) => {
      const token = employeeDB.login.validToken;
      const updateEmployee = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmailcom',
        gender: 'Male',
        salary: 24000,
        department: 'backend'
      };
      chai
        .request(app)
        .put('/api/v1/employees/61f131aab710b22b48dc8874')
        .set({ authorization: token })
        .send(updateEmployee)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe('Delete Employee Api', () => {
    it('GivenDeleteEmployeeDetails_WhenNotProper_shouldReturninTokenRequired', (done) => {
      chai
        .request(app)
        .delete('/api/v1/employees/61f131aab710b22b48dc8874')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Authorization token is required');
          done();
        });
    });
    it('GivenDeleteEmployeeDetails_WhenProper_shouldReturnSuccess', (done) => {
      const token = employeeDB.login.validToken;
      const id = uuid();
      chai
        .request(app)
        .delete(`/api/v1/employees/${id}`)
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Employee deleted successfully');
          done();
        });
    });
    it('GivenDeleteEmployeeByIdDetails_WhenNotProper_shouldReturn_Id_Not_Found', (done) => {
      const token = employeeDB.login.validToken;
      chai
        .request(app)
        .delete('/api/v1/employees/61f131aab710b22b48dc8800')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql(' Id Not Found');
          done();
        });
    });
  });
});
