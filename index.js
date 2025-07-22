const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors'); 
// Enable CORS
app.use(cors());


// Parse JSON
app.use(express.json());

// GET Route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '🚀 Hello from Cloud Run!',
    time: new Date(),
  });
});

// POST Route (optional)
app.post('/echo', (req, res) => {
  res.json({
    received: req.body,
    message: '✅ POST received and echoed back!',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
