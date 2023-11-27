import { Socket, Server } from 'socket.io';

declare module global {
  let io: Server;
}

export default defineEventHandler((event) => {
  if (global.io) {
    event.context.io = global.io;
    return;
  }
  //@ts-ignore
  global.io = new Server(event.node.res.socket?.server);
  global.io.on('connection', (socket: Socket) => {
    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId);
    });
  });
  event.context.io = global.io;
});
