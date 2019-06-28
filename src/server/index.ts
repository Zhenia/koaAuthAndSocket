import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
const session = require('koa-session');
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { logger } from './logging';
import { config } from './config';
import { router } from './routes';
import {User} from './entity/user';
import {passport} from './passport';
const bearerToken = require('koa-bearer-token')
var jwt = require('koa-jwt');
dotenv.config({ path: '.env' });
const socketioJwt = require('socketio-jwt'); // auth via JWT for socket.io
const socketIO = require('socket.io');
const http = require('http');

const connectionOptions = PostgressConnectionStringParser.parse(config.databaseUrl);
const dbPort = parseInt(connectionOptions.port);

createConnection({
    type: 'postgres',
    host: connectionOptions.host,
    port: dbPort,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: true,
    logging: false,
    entities: [
        './entity/*.ts',
        User
    ],
    extra: {
        // ssl: config.dbsslconn, // if not development, will use SSL
    }
}).then(async connection => {

    const app = new Koa();
    app.use(serve('./dist'));

    app.use(bodyParser());
    //app.use(bearerToken());
    app.use(jwt({ secret: config.jwtSecret}).unless({ path: [/^\/*/] }));

    app.keys = [config.jwtSecret];

    const CONFIG = {
        key: config.jwtSecret, 
        maxAge: 86400000,
        autoCommit: true, /** (boolean) automatically commit headers (default true) */
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
      };
      
    //app.use(session(CONFIG, app));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(router.routes());

    var server  = http.createServer(app.callback());
   /* let io = socketIO.listen(server);
    io.on('connection', socketioJwt.authorize({
        secret: config.jwtSecret,
        timeout: 15000
      }))
    .on('authenticated', function (socket) {

      
        console.log('this is the name from the JWT: ' + socket.decoded_token.displayName);
      
        socket.on("clientEvent", (data) => {
          console.log(data);
        })

    });
*/
    server.listen(config.port);

    console.log(`Server running on port ${config.port}`);

}).catch(error => console.log('TypeORM connection error: ', error));