import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TestRunGateway {
  @WebSocketServer()
  server: Server;

  public emitTestRunStart(): void {
    this.server.emit('test-run-start', 'Test run start!');
  }

  public emitTestRunEnd(): void {
    this.server.emit('test-run-end', 'Test run end!')
  }
}
