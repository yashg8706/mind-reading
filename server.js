const express = require('express');
var app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});
//SERVER SOCKET CONNECTION LISTNER
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('user_message', function(msg){
        //console.log("Meaasge sent:" +msg );
        io.emit('user_message', msg);
    });

    //FOR USERS LOGIN
    socket.on('username', function(user){
        //console.log("Meaasge sent:" +msg );
        console.log('user Name: ' + user);
        io.emit('username', user);
    });

    socket.on('disconnect', function(user){
        console.log('A user disconnected');
        //io.emit('username', user +" HAS LEFT");
    });

    socket.on('leave chat', function(customMsg){
        io.emit('username',customMsg);
        socket.disconnect();
    })
    
});

//SET SERVER LISTENING
http.listen(process.env.PORT ||4000,function(){
    console.log('Waiting for visitors');
});