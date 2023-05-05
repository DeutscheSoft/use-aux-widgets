# `componentFromWidget`

Creates a React component for the given widget type. The resulting
component has properties for all widget options and events.
Properties based on options have the same name as the corresponding option
name.

In addition to options, all events defined by the widget are available using
the standard React convention. This includes all DOM events - as well as -
all event of the widget itself. For example, the `useraction` event
can be subscribed by passing a callback to the `onUseraction` property.

In addition it is possible to define a set of bindings which can be used to
connect widget options to AWML DynamicValues. Each defined binding will
become available as a property under the same name. The convention is to use
the corresponding option name followed by a `$` character. The binding
specification follows the
[IBindingDescription](http://docs.deuso.de/AWMLv2/api/classes.html#ibindingdescription)
interface of AWML.

Both the `className` and `style` properties of standard HTML elements are
applied to the `<div>` element used by the widget.

```ts
const component = componentFromWidget(widgetImplementation, bindings, options, className);
```

- **`widgetImplementation`**_`: typeof Widget`_ - A widget implementation to
  generate a react component for.
- **`bindings`**_`: { [name: string]: IBindingDescription}`_ - A set of binding
  description for possible two-way bindings with options in the widget.
- **`options`**_`{ [name: string]: any }`_ - A set of default options for
  widgets wrapped in the resulting component. The defaults specified using this
  argument can be overwritten using properties on the resulting component.
- **`className`**_`string`_ - The default className used by this component. Note
  that setting an additional `className` on the resulting component will only
  add to classes in this parameter, it will not overwrite them.

## Usage

```jsx
import { componentFromWidget } from '@deutschesoft/use-aux-widgets';
import { Fader } from '@deutschesoft/aux-widgets/src/index.pure.js';

const FaderComponent = componentFromWidget(
  Fader,
  {
    value$: {
      name: 'value'
    },
  },
  {
    min: -96,
    max: 6,
  },
  'my-fader'
);

function MonoChannel(props) {
  const { gain$ } = props;

  return (
    <div className="mono-channel">
      <FaderComponent value$={ gain$ } />
    </div>
  );
}
```
