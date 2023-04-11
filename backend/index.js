const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 5000
connectToMongo();

// cors middleware
var cors = require('cors')
app.use(cors());
// middleware
app.use(express.json())

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook listening on ${port}`);
})
