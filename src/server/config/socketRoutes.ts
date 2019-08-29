import controller = require('./../controller');
const socketioJwt = require('socketio-jwt'); 
import { config } from './../config/config';
import {Message} from './../entity/message'

export function socketRoutes (io) {
  
    io.sockets.on('connection', socketioJwt.authorize({
        secret: config.jwtSecret,
        timeout: 15000
    }))
    .on('authenticated', function (socket) {

      console.log('this is the name from the JWT: ' + socket.decoded_token.displayName);
    
      socket.on("clientEvent", (data) => {
        console.log(data);
  
      })
      socket.on("addMessage",function (data: string) {
        var dataObject = {text:data, userId:socket.decoded_token.id }
        controller.message.createMessage(dataObject).then(()=>{
          controller.message.list().then((list)=>{
            socket.emit('messageSaveSuccess', true);
          })
        });    
    })
        

    
    });
 }
