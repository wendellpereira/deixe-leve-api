'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('routes', ()=> {

    describe('basics', ()=> {

        let basicRoutes = [
            {
                url: '/',
                expectedStatus: 200,
                assertion: 'it should have the main responding. The server is running'
            },
            {
                url: '/hello',
                expectedStatus: 200,
                assertion: 'it should have the hello responding.'
            },
            {
                url: '/notFound',
                expectedStatus: 404,
                assertion: 'it should have the notFount (404) responding.'
            },
            {
                url: '/sample',
                expectedStatus: 200,
                assertion: 'it should have the sample responding.'
            }
        ];

        basicRoutes.forEach((route)=>{

            it(route.assertion, ()=> {
                chai.request(server)
                    .get(route.url)
                    .end((error, res)=> {
                        res.should.have.status(route.expectedStatus);
                        res.should.have.header("Content-Type", 'application/json');
                        res.body.should.have.property('message');
                    });
            });
        });
    });

    describe('prospects', ()=> {});

});