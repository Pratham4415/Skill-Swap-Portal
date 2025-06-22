const express = require('express')
const route = require('route')
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Skill Swap Portal!');
});

app.listen(8000,()=> {
    console.log('Server is running on port 8000');
})