import './jsdom.js';
import { componentFromWidget } from './src/componentFromWidget.js';
import * as assert from 'node:assert';
import { WidgetMock } from './WidgetMock.js';
import test from 'node:test';
import { render } from '@testing-library/react';
import { createElement } from 'react';
import { DynamicValue } from '@deutschesoft/awml/src/dynamic_value.js';

test.only('componentFromWidget', () => {
  {
    const Component = componentFromWidget(
      WidgetMock,
      {
        foo$: {
          name: 'foo',
        },
        barAndFoo$: [{ name: 'foo' }, { name: 'bar' }],
      },
      {
        foo: 2,
      },
      'test-class-name'
    );

    let widget = null;
    const setWidget = (w) => {
      widget = w;
    };

    const value$ = DynamicValue.fromConstant(4);

    render(createElement(Component, { widgetRef: setWidget }, null));

    assert.ok(widget, 'widgetRef did not work.');
    assert.equal(widget.get('foo'), 2);

    render(
      createElement(Component, { widgetRef: setWidget, foo$: value$ }, null)
    );

    assert.equal(widget.get('foo'), 4);

    widget.set('foo', 5);

    render(
      createElement(
        Component,
        { widgetRef: setWidget, barAndFoo$: value$ },
        null
      )
    );

    assert.equal(widget.get('foo'), 4);
    assert.equal(widget.get('bar'), 4);
  }
});
