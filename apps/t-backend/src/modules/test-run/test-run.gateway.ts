import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TestRun } from './entities';

@WebSocketGateway({ cors: true })
export class TestRunGateway {
  @WebSocketServer()
  server: Server;

  public emitTestRunStart(packageName: string): void {
    this.server.emit('test-run-start', packageName);
  }

  public emitTestRunEnd(run: TestRun): void {
    this.server.emit('test-run-end', run);
  }
}
