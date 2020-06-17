const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config')

app.get('/api/allPlayers', (req, res) => {
  const sql = 'SELECT * FROM player'
  connection.query(sql, (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la récupération des joueurs')
    } else {
      res.json(results)
    } 
  })
})

app.get('/api/playersName', (req, res) => {
  const sql = 'SELECT firstname, lastname FROM player'
  connection.query(sql, (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la récupération des joueurs')
    } else {
      res.json(results)
    } 
  })
})

app.get('/api/playersA', (req, res) => {
  const sql = 'SELECT * FROM player WHERE firstname LIKE "%a%"'
  connection.query(sql, (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la récupération des joueurs')
    } else {
      res.json(results)
    } 
  })
})

app.get('/api/playersCity/L', (req, res) => {
  const sql = 'SELECT * FROM player WHERE city LIKE "L%"'
  connection.query(sql, (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la récupération des joueurs')
    } else {
      res.json(results)
    } 
  })
})

app.get('/api/playersOlder', (req, res) => {
  const sql = 'SELECT * FROM player WHERE birthday < "1990-01-01"'
  connection.query(sql, (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la récupération des joueurs')
    } else {
      res.json(results)
    } 
  })
})

app.get('/api/PlayersList/:order', (req, res) => {
  const order = req.params.order
  const sql = `SELECT firstname, lastname FROM player ORDER BY firstname ${order}`
  connection.query(sql, (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la récupération des joueurs')
    } else {
      res.json(results)
    } 
  })
})

app.post('/api/addPlayer', (req, res) => {
  const formData = req.body
  const sql = 'INSERT INTO players SET ?'
  connection.query(sql, [formData], (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de l\'ajout d\'un joueurrs')
    } else {
      res.sendStatus(200)
    }
  })
})

app.put('/api/updatePlayer/:id', (req, res) => {
  const formData = req.body
  const id = req.params.id
  const sql = 'UPDATE player SET ? WHERE id = ?'
  connection.query(sql, [formData, id], (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la modification d\'un joueurrs')
    } else {
      res.sendStatus(200)
    }
  })
})

app.put('/api/updateTogglePlayer/:id', (req, res) => {
  const id = req.params.id
  const sql = 'UPDATE player SET isWomen = !isWomen WHERE id = ?'
  connection.query(sql, [id], (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la modification d\'un joueurrs')
    } else {
      res.sendStatus(200)
    }
  })
})

app.delete('/api/deletePlayer/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM player WHERE id = ?'
  connection.query(sql, [id], (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la suppression d\'un joueurrs')
    } else {
      res.sendStatus(200)
    }
  })
})

app.delete('/api/deleteMenPlayer', (req, res) => {
  const sql = 'DELETE FROM player WHERE isWoman = 0'
  connection.query(sql, id, (err, results) => {
    if (err) {
      require.status(500).send('Erreur lors de la suppression des joueurs hommes')
    } else {
      res.sendStatus(200)
    }
  })
})



app.get('/', (request, response) => {
  response.send('Bienvenue ici');
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});