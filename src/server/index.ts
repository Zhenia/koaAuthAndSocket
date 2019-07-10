import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { config } from './config/config';
import { router } from './config/routes';
import {User} from './entity/user';
import {Message} from './entity/message';
import {passport} from './config/passport';
import {socketRoutes} from './config/socketRoutes';
const acl = require('koa-2-acl')
const bearerToken = require('koa-bearer-token')
var jwt = require('koa-jwt');
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
        Message,
        User
    ],
    extra: {
        // ssl: config.dbsslconn, // if not development, will use SSL
    }
}).then(async connection => {
    const app = new Koa();
    app.use(serve('./dist'));

    app.use(bodyParser());
    app.use(bearerToken());
    app.use(jwt({ secret: config.jwtSecret}).unless({ path: [/^\/*/] }));
    app.keys = [config.jwtSecret];
    app.use(passport.initialize());

    app.use(router.routes()).use(router.allowedMethods());
    app.use(acl.authorize);
    var server  = http.createServer(app.callback());
    server.io = socketIO.listen(server);    
    socketRoutes(server.io, router);
    server.listen(config.port);
    console.log(`Server running on port ${config.port}`);

}).catch(error => console.log('TypeORM connection error: ', error));