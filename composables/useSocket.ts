import { io } from 'socket.io-client';

let socket: ReturnType<typeof io>;

export default () => {
  if (!socket) {
    // TODO get url from env var
    socket = io('http://localhost:3000');
  }

  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', roomId);
  };

  const subscribe = (event: string, cb: (data: any) => void) => {
    socket.on(event, cb);
  };

  return { connect, joinRoom, disconnect, subscribe };
};
