require 'aws-sdk-lambda'

aws_credentials = Aws::Credentials.new(
  ENV['AWS_ACCESS_KEY_ID'],
  ENV['AWS_SECRET_ACCESS_KEY']
)
        
client = Aws::Lambda::Client.new(
  region: ENV['AWS_REGION'],
  credentials: aws_credentials
 )

req_pay = JSON.generate({action: 'message', message: 'test', connId: 'Your Conn ID'})

resp = client.invoke({
    function_name: 'test-socket-coonnetion', # give your lambda function name
    nvocation_type: 'RequestResponse',
    log_type: 'None',
    payload: req_pay,
 })

JSON.parse(resp.payload.string)
