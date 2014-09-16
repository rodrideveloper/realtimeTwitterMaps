var express=require('express');
var app=express();
var http=require('http');
var twit=require('Twit');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get('/',function(req,res){
res.sendfile('index.html');

})
//Modulo 
var Twit = require('twit');  

//Keys para acceder a la api de Twitter

var T = new Twit({  
  consumer_key: 'T6nFO3fHOv0AH8xKkfOvAY68p',
  consumer_secret: 'K3mDWeGsOuQncZ9ez5wd8S6UH4qrJ8nZP5Dc5ly2t2JqhPaXOY',
  access_token: '158932605-Pw4VJXLsYk8TvQotHGQ1QTIDLmLWRbfnTYxQomNc',
  access_token_secret: 'mKFL68qw3ZvwSj5VX1IfcOW9NUnaeHE9VEmdhL2HOYUNY'
});


//Filtro para los Tweets
var stream = T.stream('statuses/filter', { track: 'lanata'  })


io.sockets.on('connection', function (socket) {

	  stream.on('tweet', function(data) {	
	        
	        if (data.coordinates){
                if (data.coordinates !== null){                 
                    var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]}; 
                   		
			  		io.sockets.emit('mensaje',{
			  			coords:outputPoint
			  		});
			  	}
			  }	
	   
	  });

 });

server.listen(3000);