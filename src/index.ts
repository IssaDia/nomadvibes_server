#!/usr/bin/env node
import express, { Router } from 'express';
import router from './ressources/router';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));

const apiRouter = Router();
apiRouter.use('/api', router);
app.use(apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
