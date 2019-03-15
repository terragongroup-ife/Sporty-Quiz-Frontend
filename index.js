const express = require('express');
const app = express();

const path = require('path');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   console.log('i got here');
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/quiz', (req, res) => {
   console.log('i got here');
   res.sendFile(path.join(__dirname + '/quiz.html'));
});

app.get('/options', (req, res) => {
   console.log('i got here');
   res.sendFile(path.join(__dirname + '/options.html'));
})
const port = 3005;
app.listen(port, () => {
   console.log(`App is listening on port ${port}`);
});