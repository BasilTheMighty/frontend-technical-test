/**
 * Created by brett.hadley on 10/10/2016.
 */
const expect = require('chai').expect;
const getData = require('../src/api').getData;
const getVehicle = require('../src/api').getVehicle;
const server = require('../server');
require('isomorphic-fetch');

before(() => {
    server.listen(9988);
});

describe("getData example test", function () {
    it('should respond with an array of vehicles', (done) => {
        getData((response) => {
            const data = response.data;
            expect(Array.isArray(data.vehicles)).to.equal(true);
            done();
        })
    })
});

describe("getVehicle test", function () {
    it('should respond with a valid vehicle', (done) => {
        getVehicle(`/api/vehicle/xf`, (response) => {
            const data = response.data;
            expect(data).to.have.property("id");
            expect(data).to.have.property("description");
            expect(data).to.have.property("price");
            expect(data).to.have.property("meta");
            done();
        })
    })
});
