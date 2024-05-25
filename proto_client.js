const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const PROTO_PATH = path.join(__dirname, './protos/print_message.proto');


// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load the package definition
const grpcClientProto = grpc.loadPackageDefinition(packageDefinition).com.grpc.server.service;

// Create a gRPC client
const client = new grpcClientProto.PrintMessageService('localhost:8000', grpc.credentials.createInsecure());

// Call the RPC method
for (let i = 1; i <= 1000; i++) {
  // Define the request
  const request = {
    message: 'Hello from client! ' + i
  };
  client.PrintMessage(request, (error, response) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    console.log(`Server Response: ${i}`, response.serverResponse);
  });
}
