const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');


// Sample JWT token for demo purposes
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJ' +
'lYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

server.use(middlewares);
server.use(bodyParser.json());

server.post('/sign-in', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === 'demo' && password ==='demo') {
        res.json({
            name: 'SitePoint Reader',
            token: jwtToken
        });
    }
    res.status(422).send('Invalid username and password');
})
server.use((req, res, next) => {
    if(isAuthorised(req)) {
        console.log("Access granted");
        next();
    } else {
        console.log("Access denied, invalid JWT");
        res.sendStatus(401);
    }
})

server.use(router);

server.listen(3000, () => {
    console.log('JSON server is running.');
})

function isAuthorised(req) {
    let bearer = req.get('authorization');
    if(bearer === "Bearer " + jwtToken) {
        return true;
    }
    return false;
}
