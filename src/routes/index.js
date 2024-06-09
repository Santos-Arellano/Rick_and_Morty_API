// src/routes/index.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

// Fetch episodes
router.get('/', isLoggedIn, async (req, res) => {
    const END_POINT = "https://rickandmortyapi.com/graphql";
    const query = `
    {
      episodes {
        results {
          id
          name
          air_date
          episode
          characters {
            image
          }
        }
      }
    }`;

    try {
        const response = await axios.post(END_POINT, { query });
        res.render('index', {
            episodes: response.data.data.episodes.results,
            user: req.user
        });
    } catch (error) {
        console.error(error);
        res.render('index', {
            error: 'Failed to fetch episodes.',
            episodes: [],
            user: req.user
        });
    }
});

// Fetch character details
// Fetch characters
router.get('/characters', isLoggedIn, async (req, res) => {
  const END_POINT = "https://rickandmortyapi.com/graphql";
  const query = `
  {
    characters {
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }`;

  try {
      const response = await axios.post(END_POINT, { query });
      res.render('characters', {
          characters: response.data.data.characters.results,
          user: req.user
      });
  } catch (error) {
      console.error(error);
      res.render('characters', {
          error: 'Failed to fetch characters.',
          characters: [],
          user: req.user
      });
  }
});

// Fetch episode details
router.get('/episode/:id', isLoggedIn, async (req, res) => {
    const END_POINT = "https://rickandmortyapi.com/graphql";
    const episodeId = req.params.id;
    const query = `
    {
      episode(id: ${episodeId}) {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
      }
    }`;

    try {
        const response = await axios.post(END_POINT, { query });
        const episode = response.data.data.episode;
        res.render('episode', { episode });
    } catch (error) {
        console.error('Error fetching episode details:', error);
        res.render('error', { error: 'No se pudieron obtener los detalles del episodio' });
    }
});

// Ruta para agregar episodios favoritos
router.post('/favorites', isLoggedIn, async (req, res) => {
    const { episodeId, episodeName } = req.body;
    await pool.query('INSERT INTO favorites (user_id, episode_id, episode_name) VALUES (?, ?, ?)', [req.user.id, episodeId, episodeName]);
    res.redirect('/');
});

// Ruta para la página de perfil
router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const favorites = await pool.query('SELECT * FROM favorites WHERE user_id = ?', [req.user.id]);
        const [user] = await pool.query('SELECT favoriteCharacters FROM user WHERE id = ?', [req.user.id]);
        let favoriteCharacters = [];
        if (user && user[0] && user[0].favoriteCharacters && user[0].favoriteCharacters.startsWith('[')) {
            favoriteCharacters = JSON.parse(user[0].favoriteCharacters);
        }
        res.render('profile', { user: req.user, favorites, favoriteCharacters });
    } catch (error) {
        console.error(error);
        res.render('profile', { user: req.user, favorites: [], favoriteCharacters: [] });
    }
});

router.post('/favorite-characters', isLoggedIn, async (req, res) => {
    const { characterId, characterName } = req.body;
    try {
        const [user] = await pool.query('SELECT favoriteCharacters FROM user WHERE id = ?', [req.user.id]);
        let favoriteCharacters = [];
        if (user && user[0] && user[0].favoriteCharacters && user[0].favoriteCharacters.startsWith('[')) {
            favoriteCharacters = JSON.parse(user[0].favoriteCharacters);
        }
        favoriteCharacters.push({ id: characterId, name: characterName });
        await pool.query('UPDATE user SET favoriteCharacters = ? WHERE id = ?', [
            JSON.stringify(favoriteCharacters),
            req.user.id
        ]);
        res.redirect('/characters');
    } catch (error) {
        console.error(error);
        res.redirect('/characters');
    }
});


// Ruta para eliminar episodios favoritos
router.post('/favorites/delete', isLoggedIn, async (req, res) => {
    const { favoriteId } = req.body;
    await pool.query('DELETE FROM favorites WHERE id = ?', [favoriteId]);
    res.redirect('/profile');
});

// Ruta para la página de personajes
router.get('/characters', isLoggedIn, (req, res) => {
    res.render('characters');
});

// Ruta para manejar la búsqueda de personajes
router.post('/characters/search', isLoggedIn, async (req, res) => {
  try {
      const searchTerm = req.body.searchTerm;
      const END_POINT = "https://rickandmortyapi.com/graphql";
      const query = `
      {
        characters(filter: { name: "${searchTerm}" }) {
          results {
            id
            name
            status
            species
            type
            gender
            origin {
              name
            }
            location {
              name
            }
            image
          }
        }
      }`;

      const response = await axios.post(END_POINT, { query });
      const characters = response.data.data.characters.results;
      res.render('characters', { characters, user: req.user });
  } catch (error) {
      console.error(error);
      res.redirect('/characters'); // Manejo de errores
  }
});


module.exports = router;
