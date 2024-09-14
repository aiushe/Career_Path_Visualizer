const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//resume data upload
app.post('/upload-resume', (req, res) => {
  const resumeData = req.body;

  console.log("Received POST request at /upload-resume");

  console.log("Resume Data:", resumeData);

  res.status(200).send('Resume uploaded successfully');
});

