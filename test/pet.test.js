const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
//const sinon = require("sinon");
const expect = chai.expect;
const Pet = require('../models/pet');
chai.use(chaiAsPromised);

describe('functional - pet', ( ) => {
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
        age: 4,
        color: 'red'
    });
    
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
   
   
  });

  it('should create a pet', async ( ) => {
    const pet = {
        name: 'testpet',
        age: 4,
        color: 'red'
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.color).to.equal(pet.color);
  });

  it('should get a pet', async ( ) => {
    const res = await request(app).get('/pets').send();
    expect(res.status).to.equal(200);  
  });

  it('should delete a pet', async ( ) => {
    let res = await request(app).del('/pets/dog').send();
    expect(res.status).to.equal(200);     
  });
  it('should not delete a pet', async ( ) => {
    let res = await request(app).del('/pets/').send();
    expect(res.status).to.equal(404);     
  });
});

