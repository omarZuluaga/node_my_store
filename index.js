const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index.router.js');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const whiteList = ['http://localhost:8080', 'https://myapp/co'];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('denied'));
    }
  }
}
app.use(cors(options));
require('./utils/auth');

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('my port ' + port);
});
