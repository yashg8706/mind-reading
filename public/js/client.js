//==== EVENT LISTENERS ====
$(function(){
    $('#gameEnv').hide()
    $('#result').hide()
    $('#newgamebtn').hide();
    $('#gamebtn').prop('disabled', true);
    var socket = io();

	$('form').submit(function(e){
		e.preventDefault();
		if($('#login_txt').val()!='YOU LEFT THE CHAT')
		{
            $('#gamebtn').prop('disabled', true);
			socket.emit('user_message',$('#login_txt').val()+" said: "+$('#txt_msg').val());
			$('#txt_msg').val('');
			return false;
		}
		
	});

    /******************RANDOM NUMBER GENERATOR***************/

    
    
    $('#gamebtn').click(function(){
        var range = 200;
        var number = Math.floor( Math.random() * range / 2 ) * 2; 
        var result= number / 2;
        $('#dynamic_statement').text("Add " +  number + " in the current result");

        $('#result').text("Hoooraah your  result is " + result);
        $('#gameEnv').show();
        $('#gamebtn').hide();
        $('#newgamebtn').show();
        $('#result').hide();
    });

    $('#newgamebtn').click(function(){
        var range = 200;
        var number = Math.floor( Math.random() * range / 2 ) * 2; 
        var result= number / 2;
        $('#dynamic_statement').text("Add " +  number + " in the current result");

        $('#result').text("Hoooraah your  result is " + result +"!!!!");
        $('#gameEnv').show();
        $('#gamebtn').hide();
        $('#newgamebtn').hide();
        $('#result').hide();
    });
    $('#gamefinish').click(function(){
        $('#newgamebtn').show();
        $('#gameEnv').hide();
        $('#gamebtn').hide()
        $('#result').show()
    });
    /*************************************************************/
	$('#btn_login').click(function(){
    socket.emit('username',$('#login_txt').val());
    $('#gamebtn').prop('disabled', false);
    $('#btn_login').prop('disabled', true);
    $('#login_txt').prop('disabled', true);
	});

	$('#btn_quit').click(function(){
		socket.emit('leave chat',$('#login_txt').val()+" HAS LEFT CHAT");
        $('#login_txt').val('YOU LEFT THE CHAT');
        $('#btn_login').prop('disabled', false);
        $('#login_txt').prop('disabled', false);
	});
    
//SOCKET LISTENERS
	socket.on('username', function(user){
		$('#users').append($('<li>').text(user));
	});
	socket.on('user_message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});

});