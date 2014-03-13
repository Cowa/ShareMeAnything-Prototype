/****************
 ** CONNECTION **
 ****************/
 
// Socket connection to server
var socket = io.connect('192.168.0.34:1337');

// Tell server we wanna share
socket.emit('new');

/***********************
 ** SOCKET 'ON' EVENT **
 ***********************/

// When client gets room' state
socket.on('room_state', function(msg) {
	
	if (msg == 0) {
		$('#state').text('You are alone, please wait.').show();
		$('#under_state').text('Don\'t worry, someone will soon be connected (hopefully).').show();
		$('#share_box').hide();
	} else if (msg == 1) {
		$('#state').hide();
		$('#under_state').text('You are in touch with someone.').show();
		$('#share_box').show();
	} else {
		$('#state').text('Error.').show();
		$('#under_state').text('Error.').show();
	}
	$('#tryAgain').hide();
});

// When client gets his role (sender or receiver)
socket.on('role', function(role) {
	
	var message = 'clockwork';
	
	if(role == 'sender') {
		message = 'Your turn to share.';
		$('#share_form').show();
	} else if(role == 'receiver') {
		message = 'Please wait the share.';
		$('#share_form').hide();
	}
	$('#vote').hide();
	$('#role').text(message);
	$('#tryAgain').hide();
});

// When client (the receiver) receives an image
socket.on('receive_image', function(image) {

	$('#vote').show();
	$('#fine').text('Fun');
	$('#bad').text('Bad');
	$('#role').text('You got something. How is it ?');
	$('#under_state').text('Don\'t let the sharer waits too long.').show();
	$('#tryAgain').hide();

	show_image(image);
});

// Remove share box content
socket.on('clear_room', function() {
	clear_share();
});

// When End Of Stream occured, the receiver puts an end by voting 'Bad'
socket.on('eos', function(message) {

	var state = 'Error eos.', under_state = 'See below.';
	
	if(message == 1) state = 'So... it was bad ?', under_state = 'Oh. You were right. It was bad.';
	if(message == 0) state = 'Your share was bad.', under_state = 'Don\'t be sad. Life is unfair.';
	
	$('#state').text(state).show();
	$('#under_state').text(under_state).show();
	$('#share_box').hide();
	$('#tryAgain').show();
});

/***************
 ** FUNCTIONS **
 ***************/

// Clear the share
function clear_share() {
	$('#share_box_content').empty();
}

// When client shares something
function share() {

	$('#share_form').hide();
	$('#to_share').val('').focus();
	$('#role').text('Well done. Now wait the vote.');
	$('#under_state').text('It may take a moment depending on the share.').show();
}

// Display the shared image in the share box content
function show_image(image) {

	$('#share_box_content').append('<a href="'+ image +'"><img src="' + image + '"/></a>');
	$('#share_box_content > a').fancybox();
}

// When client likes the share
function fine() {
	socket.emit('fine');
}

// When client dislike the share
function bad() {
	socket.emit('bad');
}

/*****************
 ** DOM SECTION **
 *****************/

$('#share_form').submit(function () {
    return false; // avoid page reloading
});

$('#imagefile').on('change', function(e) {

	console.log('test');
    var data = e.originalEvent.target.files[0];
	console.log(data);
	var reader = new FileReader();
    reader.onload = function(evt) {
		show_image(evt.target.result);
		socket.emit('send_image', evt.target.result);
		share();
    };
    reader.readAsDataURL(data);
});
