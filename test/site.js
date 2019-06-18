const OK = 200;
const SERVER_ERROR = 500;
const UNAUTHORIZED = 401;

QUnit.module( "module", {
    afterEach: () => sinon.restore(),
    beforeEach: () => {
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.requests = [];
        this.xhr.onCreate = req => this.requests.push(req);
    }
});

QUnit.test( "Change password", assert => {
    sinon.replace(locationWrapper, 'search', sinon.fake.returns('?changePassword'));

    load();

    assert.ok(this.requests.length === 1);
    this.requests[0].respond(OK, { "Content-Type": "application/json" }, '{}');
    assert.ok(this.requests.length === 3);
    this.requests[1].respond(OK, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 4);
    this.requests[2].respond(OK, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 5);
    this.requests[3].respond(OK, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 5);
    this.requests[4].respond(OK, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 5);
});

QUnit.test( "Recover", assert => {
    sinon.replace(locationWrapper, 'search', sinon.fake.returns('?recover'));

    load();

    assert.ok(this.requests.length === 1);
    this.requests[0].respond(UNAUTHORIZED, { "Content-Type": "application/json" }, '{}');
    assert.ok(this.requests.length === 3);
    this.requests[1].respond(SERVER_ERROR, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 3);
    this.requests[2].respond(SERVER_ERROR, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 3);
});

QUnit.test( "Sign up", assert => {
    sinon.replace(locationWrapper, 'search', sinon.fake.returns('?signUp'));

    load();

    assert.ok(this.requests.length === 1);
    this.requests[0].respond(UNAUTHORIZED, { "Content-Type": "application/json" }, '{}');
    assert.ok(this.requests.length === 3);
    this.requests[1].respond(OK, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 4);
    this.requests[2].respond(OK, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 5);
    this.requests[3].respond(SERVER_ERROR, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 5);
    this.requests[4].respond(SERVER_ERROR, { "Content-Type": "text/html" }, '');
    assert.ok(this.requests.length === 5);
});