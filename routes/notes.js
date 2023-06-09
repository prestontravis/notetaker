const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

module.exports = router;

// notes.js

// ...

router.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json'), 'utf8'));
    const noteId = req.params.id;
  
    // Find the index of the note with the given id
    const noteIndex = notes.findIndex((note) => note.id === noteId);
  
    // If the note is found, remove it from the notes array
    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
  
      // Write the updated notes array back to the file
      fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(notes));
  
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  });
  
  // ...
  