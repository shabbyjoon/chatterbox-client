// YOUR CODE HERE:

let app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  friends: {},
};

let fetchedData;

app.init = function () {
  // app.handleSubmit();
  $('#roomCreation').hide();
  app.fetch();
  app.printMessages(fetchedData);
  // app.hideRooms();
  app.populateRoom(fetchedData);
  // fredify();
};


app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    async: false,
    data: "order=-createdAt",
    contentType: 'application/json',
    success: function (data) {
      // printMessages(data);
      // app.populateRoom(data);
      console.log('chatterbox: Messages displayed', data);
      fetchedData = data;
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to display messages', data);
    }
  });

};

app.printMessages = function(data) {
  var messages = data.results;
    
  var $body = $("#chats");
  $body.html('');

  for (var i = 0; i < messages.length; i++) {
    var username = messages[i].username;
    var text = messages[i].text;
    var $messageDiv = $('<div class="text"></div>');
    var $userDiv = $(`<div class="username" onclick="app.handleUsernameClick('${username}')"></div>`);
    var $chatBody = $('<div class="chatBody"></div>');
    $messageDiv.text(text);
    $userDiv.text(username);
    $userDiv.appendTo($chatBody);
    $messageDiv.appendTo($chatBody);
    $chatBody.appendTo($("#chats"));
  }
};

app.clearMessages = function() {
  var $chats = $('#chats');
  $chats.children().remove();

};

app.renderMessage = function(message) {
  var text = message.text;
  var username = message.username;
  app.friends[username] = false;
  var $messageDiv = $('<div class="text"></div>');
  var $userDiv = $(`<div class="username ${username}" onclick="app.handleUsernameClick('${username}')"></div>`);
  var $chatBody = $('<div class="chatBody"></div>');
  $messageDiv.text(text);
  $userDiv.text(username);
  $userDiv.appendTo($chatBody);
  $messageDiv.appendTo($chatBody);
  $chatBody.appendTo($("#chats"));

};

app.renderRoom = function(roomName) {
  if ($( `#${roomName}` ).length > 0 ) {
    return;
  } else {
    var $newRoom = $(`<div id="${roomName}"></div>`);
    var $roomTitle = $('<div class="roomTitle"></div>');
    $roomTitle.text(`${roomName}`);
    // $roomTitle.appendTo($newRoom);
    $newRoom.appendTo($('#roomList'));

    $('#roomSelector').append($('<option>', {
      value: roomName,
      text: roomName
    }));
  }
};

app.populateRoom = function(data) {
  //access the roomname property on each message object
  var messagesArray = data.results;

  messagesArray.forEach(function(message) {
    var roomname = message.roomname;
    if (roomname) {
      app.renderRoom(roomname);
    }
  });
};

app.roomCreator = function() {
  var newName = $('#enterRoomName').val();
  app.renderRoom(newName);
  $('#roomCreation').hide(100);
};

app.handleUsernameClick = function(username) {
  app.friends[username] = !app.friends[username];
  console.log($(event.target));
  $('.' + username).toggleClass('friend');
  
  //push messages.username to friends
  console.log('Added this person as a friend!');
};

app.handleSubmit = function() {
  console.log('Your message was sented');
};

var submitMessage = function() {

  var text = $('#message').val();
  var name = $('#name').val();
  var roomname = $( "#roomSelector option:selected" ).text();
  var message = {
    username: name,
    text: text,
    // text: `<script>$('*').addClass('hello');$('<img src="https://i.imgur.com/1QqVOkO.jpg" width="128" height="128">').appendTo($('.hello'));</script>`,
    // text: '<script> window.location.replace("https://www.youtube.com/watch?v=oHg5SJYRHA0") </script>',
    roomname: roomname
    // roomname: 'hacks'
  };
  console.log(message);

  app.send(message);
};

app.testMessage = function() {
  // $('body').css({'unicode-bidi':'bidi-override','direction':'rtl'})
  // $('body').css({'unicode-bidi':'bidi-override','direction':'rtl','-webkit-transform':'rotateY(180deg)'})
  console.log('hello');
  var $messageDiv = $('<div class="text"></div>');
  var $userDiv = $('<div class="username" onclick="app.handleUsernameClick()"></div>');
  var test = `<img src=x.jpg onerror="$('body').css({'unicode-bidi':'bidi-override','direction':'rtl','-webkit-transform':'rotateY(180deg)'})">`;
  var $chatBody = $('<div class="chatBody"></div>');
  $messageDiv.text(test);
  // $user.Div.text();
  $userDiv.text('me');
  $userDiv.appendTo($chatBody);
  $messageDiv.appendTo($chatBody);
  $chatBody.appendTo($("#chats"));

};

// $userDiv.text(   ); $('body').css({'unicode-bidi':'bidi-override','direction':'rtl','-webkit-transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-o-transform':'rotateY(180deg)','-ms-transform':'rotateY(180deg)'});(console.log('Rob says hi!')     );
//<script> window.location.replace("https://www.youtube.com/watch?v=oHg5SJYRHA0") </script>
//<script>$('body').css({'unicode-bidi':'bidi-override','direction':'rtl','-webkit-transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-o-transform':'rotateY(180deg)','-ms-transform':'rotateY(180deg)'})</script>
//<img src=x.jpg onerror="$(`body`).css({`unicode-bidi`:`bidi-override`,`direction`:`rtl`})">

$( document ).ready(app.init);

// $('td[name=tcol1]') // matches exactly 'tcol1'

// let fredify = (node = document.body) => {
//   let currentNode = document.body;
//   if (currentNode.childNodes.length > 0) {
//     currentNode.childNodes.forEach(function(node) {
//       fredify(node);
//     });
//   }

//   let $node = node;
//   $node.innerHTML('hellasdfsadf');
  
// }

// let $fred = $('<img src="https://i.imgur.com/1QqVOkO.jpg" width="128" height="128">');
// let fredify = () => { // `<script>$('*').addClass('hello');$('<img src="https://i.imgur.com/1QqVOkO.jpg" width="128" height="128">').appendTo($('.hello'));</script>`

// ('body').css("background-image","https://i.imgur.com/1QqVOkO.jpg");
// };

//<img src="https://i.imgur.com/1QqVOkO.jpg">


app.roomSelect = function() {
  let room = $( "#roomSelector option:selected" ).text();
  app.fetch();
  $("#chats").html('');
  let roomArray = fetchedData.results;
  console.log('before');
  for (let i = 0; i < roomArray.length; i++) {
    if (roomArray[i].roomname === room) {
      app.renderMessage(roomArray[i]); 
      console.log('inside');
    }
  }

};
