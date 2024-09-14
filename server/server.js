const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/resumes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const extractTextFromDocx = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

app.post('/upload-resume-file', upload.single('resume'), async (req, res) => {
  const file = req.file;
  let extractedText = '';

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension === '.pdf') {
    extractedText = await extractTextFromPDF(file.path);
  } else if (fileExtension === '.docx') {
    extractedText = await extractTextFromDocx(file.path);
  } else {
    return res.status(400).json({ message: 'Unsupported file type' });
  }

  fs.unlinkSync(file.path);

  res.status(200).json({ message: 'File uploaded successfully', extractedText });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});