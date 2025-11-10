import { useWidget } from '../../index.js';

class Widget {}

function run() {
  useWidget(Widget, new Map());
}
