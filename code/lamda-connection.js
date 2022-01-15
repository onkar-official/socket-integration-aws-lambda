const AWS = require('aws-sdk')

const api = new AWS.ApiGatewayManagementApi({
  endpoint: 'XXXXXXXX.execute-api.ap-south-1.amazonaws.com/production'
})

exports.handler = async (event) => {
  const route = event.requestContext.routeKey
  const connectionId = event.requestContext.connectionId

  switch (route) {
    case '$connect':
      console.log('Connection occurred resp')
      break
    case '$disconnect':
      console.log('Disconnection occurred')
      break
    case 'message':
      const data = { message: 'Hello World!' }
      await postMessage(data, connectionId)
      break
    default:
      console.log('Received unknown route:', route)
  }
  return {
    statusCode: 200
  }
};

async function postMessage(data, connectionId) {
  const params = {
    ConnectionId: connectionId,
    Data: Buffer.from(JSON.stringify(data))
  }
  return api.postToConnection(params).promise()
};
