import WSEventbus from '../../../src/node/WSEventbus.js';

const socket = new WSEventbus({ host: 'localhost:8001' });

socket.on('socket:open', () =>
{
   console.log('socket:open');
   socket.send({ msg: 'connect' });
});

socket.on('socket:close', () =>
{
   console.log('socket:close');
});

socket.on('socket:message:in', (message) =>
{
   console.log(`socket:message:in - ${JSON.stringify(message)}`);
});

