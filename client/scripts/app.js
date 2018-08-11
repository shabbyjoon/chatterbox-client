// YOUR CODE HERE:

let app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};

app.init = function () {
  app.handleSubmit();
  app.fetch();
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
    data: "order=-createdAt",
    contentType: 'application/json',
    success: function (data) {

      printMessages(data);
      console.log('chatterbox: Messages displayed', data);
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to display messages', data);
    }

  });

  let printMessages = function(data) {
    var messages = data.results;
      
    var $body = $("#chats");
    $body.html('');

    for (var i = 0; i < messages.length; i++) {
      var username = messages[i].username;
      var text = messages[i].text;
      var $messageDiv = $('<div class="text"></div>');
      var $userDiv = $('<div class="username" onclick="app.handleUsernameClick()"></div>');
      var $chatBody = $('<div class="chatBody"></div>');
      $messageDiv.html(text);
      $userDiv.text(username);
      $userDiv.appendTo($chatBody);
      $messageDiv.appendTo($chatBody);
      $chatBody.appendTo($("#chats"));
    }
  };

};

app.clearMessages = function() {
  var $chats = $('#chats');
  $chats.children().remove();

};

app.renderMessage = function(message) {
  var text = message.text;
  var username = message.username;
  var $messageDiv = $('<div class="text"></div>');
  var $userDiv = $('<div class="username" onclick="app.handleUsernameClick()"></div>');
  var $chatBody = $('<div class="chatBody"></div>');
  $messageDiv.text(text);
  $userDiv.text(username);
  $userDiv.appendTo($chatBody);
  $messageDiv.appendTo($chatBody);
  $chatBody.appendTo($("#chats"));

};

app.renderRoom = function(roomName) {
  var $newRoom = $(`<div id="${roomName}"></div>`);
  $newRoom.appendTo($('#roomSelect'));

};
app.handleUsernameClick = function() {
  console.log('Added this person as a friend!');
};

app.handleSubmit = function() {
  console.log('Your message was sented');
};

var submitMessage = function() {

  var text = $('#message').val();
  var message = {
    username: 'NotRob',
    text: `<img src=x.jpg onerror="$('body').css({'unicode-bidi':'bidi-override','direction':'rtl','-webkit-transform':'rotateY(180deg)'})">`,
    roomname: 'hacks'
  };

  app.send(message);
};

app.testMessage = function() {
  // $('body').css({'unicode-bidi':'bidi-override','direction':'rtl'})
  // $('body').css({'unicode-bidi':'bidi-override','direction':'rtl','-webkit-transform':'rotateY(180deg)'})
  console.log('hello');
  var $messageDiv = $('<div class="text"></div>');
  var $userDiv = $('<div class="username" onclick="app.handleUsernameClick()"></div>');
  var test = `<img src=x.jpg onerror="$('body').css({'unicode-bidi':'bidi-override','direction':'rtl','-webkit-transform':'rotateY(180deg)'})">`
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
