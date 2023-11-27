import { io } from 'socket.io-client';

let socket: ReturnType<typeof io>;

export default () => {
  const connected = ref(false);

  if (!socket) {
    // TODO get url from env var
    socket = io('http://localhost:3000');
  }

  const connect = () => {
    if (!connected.value) {
      socket.connect();
      connected.value = true;
    }
  };

  const disconnect = () => {
    if (connected.value) {
      socket.disconnect();
    }
  };

  const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', roomId);
  };

  const subscribe = (event: string, cb: (data: any) => void) => {
    socket.on(event, cb);
  };

  return { connect, joinRoom, disconnect, subscribe };
};
