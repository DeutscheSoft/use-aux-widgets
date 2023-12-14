import Events from 'node:events';

export class BackendMock extends Events {
  constructor(isOpen) {
    super();
    this.isOpen = isOpen || false;
    this.isInit = !this.isOpen;
    // don't fail here
    this.on('error', () => {});
  }

  close() {
    this.triggerClose();
  }

  destroy() {
    this.emit('destroy');
  }

  triggerError(err) {
    this.isOpen = false;
    this.isInit = false;
    this.emit('error', err);
    this.destroy();
  }

  triggerClose() {
    this.isOpen = false;
    this.isInit = false;
    this.emit('close');
    this.destroy();
  }

  triggerOpen() {
    this.isOpen = true;
    this.isInit = false;
    this.emit('open');
  }
}
