import { Server } from 'socket.io'
import Pad from '@/models/pad'

const SocketHandler = (req: any, res: any) => {
  const pad = new Pad();

  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', socket => {
      socket.on('padChange', msg => {
        pad.save(msg);
        socket.broadcast.emit(`padUpdate-${msg.path}`, msg);
      });
    });
  }
  res.end()
}

export default SocketHandler