const socketConn = new WebSocket('wss://XXXXXXXX.execute-api.ap-south-1.amazonaws.com/production');
let connId;;

socketConn.addEventListener('open', e => {
  console.log('WebSocket is connected');
});

socketConn.addEventListener('close', e => console.log('WebSocket Connection is closed'));

socketConn.addEventListener('error', e => console.error('WebSocket Connection is in error', e));

socketConn.addEventListener('message', e => {
  if(JSON.parse(e.data).connId) {
    connId = JSON.parse(e.data).connId;
  } else if (JSON.parse(e.data).message) {
    console.log('You will get connection Id here:', JSON.parse(e.data).message)
  }
});

function getConnIdAction() {
  const payload = {
    Action: 'message', // route will match with this
  }
  socketConn.send(JSON.stringify(payload));
};

function sendConnectionId() {
  const payload = {
    connId
  }
  // API call will go over here.
};
