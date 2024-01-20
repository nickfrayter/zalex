require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/request-certificate', async (req, res) => {
  try {
    const response = await axios.post(`https://zalexinc.azure-api.net/request-certificate?subscription-key=${process.env.API_KEY}`, req.body, {
      headers: { 
        'Content-Type': 'application/json',
      },
    });
    
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Error while calling API");
  }
});

app.get('/request-list', async (req, res) => {
    try {
      const response = await axios.get(`https://zalexinc.azure-api.net/request-list?subscription-key=${process.env.API_KEY}`, {
        headers: { 
          'Content-Type': 'application/json',
        },
      });
  
      res.json(response.data);
    } catch (err) {
      res.status(500).send("Error while calling API");
    }
  });
  
  

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
