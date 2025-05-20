const http = require('http');
const app = require('./app');
const Server = http.createServer(app);
const port = process.env.PORT || 3000;

Server.listen(port, () => {
    console.log(`server running on port : ${port}`)
})
