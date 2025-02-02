import { WebSocketServer, WebSocket } from 'ws';


const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;


wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    ws.on('message', function message(data: any) {
      const message = JSON.parse(data);
      if(message.type === 'sender') {
        senderSocket = ws;
      }
      else if(message.type === 'receiver') {
        receiverSocket = ws;
      }
      else if(message.type === 'createOffer') {
        receiverSocket?.send(JSON.stringify({ type: 'offer', offer: message.offer }));
      }
      else if(message.type === 'create-answer') {
        senderSocket?.send(JSON.stringify({type: 'answer', offer: message.offer }))
      }
    });
  
    ws.send('something');
  });