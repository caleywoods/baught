// npm install irc-js to
// get this in the first place
var irc = require('./node_modules/IRC-js/lib/irc');

var opts = {server: "irc.freenode.org",
            channels: ["#jinglebellsfoo"],
            nick: "baught"}; // baught is registered on freenode, need to pick a new name

// Create a new irc connection to
// the server from opts and set
// our nick to what was defined
var server = new irc({ server: opts.server, nick: opts.nick });

// Step through each of the channels
// defined in the channels section 
// of opts and join each channel
server.connect(function() {
  setTimeout(function() {
    for(chan in opts.channels) {
      server.join(opts.channels[chan]);
    }
  }, 2000);
});

// Just like fps doug
// he can dance all day
server.addListener('privmsg', function(msg) {
  chan    = msg.params[0];
  message = msg.params[1];

  if(message == 'Dance baught!') {
    server.privmsg( chan, "I'm dancin!!!" );
  }
});

// Better way to handle this?
// Listen for the "baught gtfo" message
// and quit after sending a snarky msg
// to the channel where the msg originated
server.addListener('privmsg', function(msg) {
  chan    = msg.params[0];
  message = msg.params[1];

  if(message == 'baught gtfo') {
    server.privmsg( chan, "You guys are lame, I'm out." );
    server.quit(); //not using a quit msg
  }
});
