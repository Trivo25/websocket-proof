import WebSocket from 'ws';

import { MyProgram, MyProof } from './zkprogram.js';

await MyProgram.compile();
console.log('compiled');

const ws = new WebSocket('ws:localhost:8080');

ws.on('error', console.error);

ws.on('open', function open() {
  console.log('opened connection');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});

// generate a proof
const proof = await MyProgram.baseCase();

ws.send(JSON.stringify(proof.toJSON()));
