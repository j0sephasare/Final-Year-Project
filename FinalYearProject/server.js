const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

// Serve the static files from the Ionic build directory
app.use(express.static(path.join(__dirname, 'www')));

// All routes should be directed to the index.html file
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
