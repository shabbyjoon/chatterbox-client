// YOUR CODE HERE:

let app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};

app.init = function () {};

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
    // data: messages,
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
      console.log(messages);
      for (var i = 0; i < messages.length; i++) {
          var username = messages[i].username;
          var text = messages[i].text;
          console.log(username, typeof username);
          var $name = $('<div class="messages"></div>');
          $name.text(username + ': ' + text);
          $name.appendTo($body);


      }
  }

};

app.clearMessages = function() {
    var $chats = $('#chats');
    $chats.children().remove();

};

app.renderMessage = function() {

};