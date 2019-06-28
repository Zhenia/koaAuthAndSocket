const socket = io('http://localhost:3000');


const websocketConnect = (jwt) => {    
  
    socket.on('connect', function () {
      socket.emit("clientEvent", "Я еще не отослал свой токен");
      socket.emit('authenticate', {token: jwt})
      .on('authenticated', function () {
        socket.emit("clientEvent", "Я отослал свой токен и прошел авторизацию");
      })
      .on('unauthorized', function(msg) {
        console.log("unauthorized: " + JSON.stringify(msg.data));
        throw new Error(msg.data.type);
      })
    });
  
  };