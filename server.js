const express = require('express');
const path = require('path');

const server = express();
const port = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static('public'));

// Routes
const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notes');
server.use('/', indexRoutes);
server.use('/notes', notesRoutes);

// Start the server
server.listen(port, () => {
  console.log(`App listening on PORT ${port}`);
});
