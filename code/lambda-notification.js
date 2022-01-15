const AWS = require('aws-sdk');

const api = new AWS.ApiGatewayManagementApi({
  endpoint: 'XXXXXXXX.execute-api.ap-south-1.amazonaws.com/production',
});

exports.handler = async (event) => {
  if(event.requestContext) {
    const route = event.requestContext.routeKey;
    const connectionId = event.requestContext.connectionId;
    switch (route) {
      case '$connect':
        console.log('Connection occurred resp')
        break
      case '$disconnect':
        console.log('Disconnection occurred')
        break
      case 'message':
        await postMessage({ connId: connectionId }, connectionId)
        break
      default:
        console.log('Received unknown route:', route)
    }
  } else {
    const connId = event.connId;
    await postMessage({ message: event.message }, connId);
  }
  return {
    statusCode: 200,
  }
};

async function postMessage(data, connectionId) {
  const params = {
    ConnectionId: connectionId,
    Data: Buffer.from(JSON.stringify(data)),
  }
  return api.postToConnection(params).promise();
};
