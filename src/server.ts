import { Empty, Field, SelfProof, ZkProgram } from 'o1js';
import WebSocket, { WebSocketServer } from 'ws';
import { MyProgram } from './zkprogram';

await MyProgram.compile();
const MyProof = ZkProgram.Proof(MyProgram);

console.log('compiled');
const wss = new WebSocketServer({
  port: 8080,
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', async function message(data) {
    const jsonData = JSON.parse(data as any);
    console.log('received: %s', jsonData);

    const proof = await MyProof.fromJSON(jsonData);
    proof.verify();
    console.log('received a proof, verified');
    const recursiveProof = await MyProgram.inductiveCase(proof);
    console.log('genrated recursive proof');
    recursiveProof.verify();
    console.log('proof valid, sending back to client');
  });

  ws.send('something');
});
