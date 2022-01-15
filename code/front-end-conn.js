const socketConn = new WebSocket('wss://XXXXXXXX.execute-api.ap-south-1.amazonaws.com/production')

socketConn.addEventListener('open', e => {
  console.log('WebSocket is connected');
});

socketConn.addEventListener('close', e => console.log('WebSocket Connection is closed'));

socketConn.addEventListener('error', e => console.error('WebSocket Connection is in error', e));

socketConn.addEventListener('message', e => {
  console.log('Your output will be printed over here:', JSON.parse(e.data).message);
});

function sendMessage(msg) {
  const payload = {
    Action: 'message', // route will match with this
    Msg: 'Your message'
  }
  socketConn.send(JSON.stringify(payload));
};
