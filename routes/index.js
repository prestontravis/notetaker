const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

router.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json'), 'utf8'));
  res.json(notes);
});

router.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json'), 'utf8'));
  const newNote = req.body;
  newNote.id = Date.now().toString();
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(notes));
  res.json(newNote);
});

router.delete('/api/notes/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json'), 'utf8'));
  const noteId = req.params.id;
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(updatedNotes));
  res.json({ success: true });
});

module.exports = router;
