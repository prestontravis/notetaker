const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8'));
  const newNote = req.body;
  newNote.id = Date.now().toString();
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8'));
  const noteId = req.params.id;
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(updatedNotes));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
