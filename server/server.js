const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/upload-resume', (req, res) => {
  const resumeData = req.body;

  console.log('Received POST request at /upload-resume');
  console.log('Resume Data:', resumeData);

  const careerPaths = [
  { title: 'Software Engineer', skills: ['JavaScript', 'React', 'Node.js'] },
  { title: 'Data Scientist', skills: ['Python', 'Pandas', 'Machine Learning'] },
  { title: 'Front-End Developer', skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Back-End Developer', skills: ['Node.js', 'Express', 'MongoDB', 'SQL'] },
  { title: 'DevOps Engineer', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
  { title: 'Product Manager', skills: ['Leadership', 'Communication', 'Agile'] },
  { title: 'Cybersecurity Specialist', skills: ['Network Security', 'Firewalls', 'Encryption', 'Linux'] },
  { title: 'AI Researcher', skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow'] },
];

  const matchedPaths = careerPaths.filter(path =>
    path.skills.every(skill => resumeData.skills.includes(skill))
  );

  if (matchedPaths.length > 0) {
    res.status(200).json({
      message: 'Matching career paths found',
      careerPaths: matchedPaths
    });
  } else {
    res.status(200).json({
      message: 'No exact career path match found, but keep developing your skills!'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});