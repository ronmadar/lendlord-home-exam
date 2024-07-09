const APP_ENV = process.env.NODE_ENV || 'development'
const runMode = process.env.RUN_MODE || 'app'
global.APP_ENV = APP_ENV
const config = require('./config/config').get(APP_ENV)
global.config = config
require('events').EventEmitter.defaultMaxListeners = 5

require('dotenv').config({ path: `./.env.${APP_ENV}` })
const Koa = require('koa')
const koaCors = require('@koa/cors')
const { koaBody } = require('koa-body')
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const KoaRouter = require('koa-router');
const json = require('koa-json')

const router = require('./routes/routes');
const model = require('./models')
model.init()
const server = new Koa()

// Middleware
server.use(bodyParser());
server.use(koaCors()); 
server.use(json()); 

server.use(router.routes()).use(router.allowedMethods());

if (runMode === 'app') {

  server.use(
    koaBody({
      includeUnparsed: true,
      formLimit: '50mb',
      jsonLimit: '50mb',
      textLimit: '50mb',
      multipart: true,
      formidable: {
        uploadDir: './tmp',
        keepExtensions: true
      }
    })
  )

  server.use(
    koaCors({
      methods: 'POST, GET, PUT, DELETE, OPTIONS',
      allowMethods: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    })
  )

  require('./routes')(server)

  // Connect to MongoDB
  mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

}

const port = config.ports[runMode]

log.info(`started in ${APP_ENV} env, listening to port ${port}`)
server.listen(port)
