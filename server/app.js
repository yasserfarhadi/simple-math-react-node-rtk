import express from 'express';
import operatorsRouter from './routes/operators.js';
import bodyParser from 'body-parser';

const PORT = 8080;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/operators', operatorsRouter);

app.listen(PORT, () => {
  console.log('server is listening on localhost:' + PORT);
});
