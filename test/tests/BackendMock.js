import Events from 'node:events';

export class BackendMock extends Events {
  constructor(isOpen) {
    super();
    this.isOpen = isOpen || false;
    this.isInit = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  triggerError(err) {
    this.isOpen = false;
    this.isInit = false;
    this.emit('error', err);
  }

  triggerClose() {
    this.isOpen = false;
    this.isInit = false;
    this.emit('close');
  }

  triggerOpen() {
    this.isOpen = true;
    this.isInit = false;
    this.emit('open');
  }
}
