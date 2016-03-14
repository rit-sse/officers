import express from 'express';
import path from 'path';

const app = express();

app.use('/officers', express.static('dist'));

app.use('/officers/*', (req, res)  => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

export default app;
