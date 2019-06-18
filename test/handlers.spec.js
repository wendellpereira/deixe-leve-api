'use strict';

const expect = require('chai').expect;
const handlers = require('../lib/handlers');

describe('handlers', ()=> {

    it('should export a object', ()=> {
        expect(handlers).to.be.a('object');
    });
    
    it('should have the handlers  main , notFound , sample ,  hello ,  users ', ()=> {
        const methods = ['notFound', 'main', 'sample', 'hello', 'users'];
        const handlersKey = Object.keys(handlers);
        let handlerMissing = [];
        methods.forEach((method)=> {
            if(handlersKey.indexOf(method) === -1) { handlerMissing.push(method) };
        });
        expect(handlerMissing).length(0);
    });
});