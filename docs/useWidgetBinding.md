# `useWidgetBinding`

Create a binding or a list of bindings with a widget.

```ts
useWidgetBinding(widget, bindings);
```

- **`widget`**_`: Widget`_ - The widget to bind to.
- **`bindings`**_`: IBindingDescription | IBindingDescription[]`_ - The
  description of the binding(s) to create.

## Usage

```jsx
import { useWidget, useWidgetBinding } from '@deutschesoft/use-aux-widgets';
import { EqBand } from '@deutschesoft/aux-widgets/src/index.pure.js';

function Equalizer(props) {
  const { gain$, frequency$, q$ } = props.band1;
  const band = useWidget(EqBand, {
    type: 'parametric',
    label: 'Band#1'
  });
  
  useWidgetBinding(band, [
    {
      name: 'gain',
      backendValue: gain$,
    },
    {
      name: 'freq',
      backendValue: frequency$,
    },
    {
      name: 'q',
      backendValue: q$,
    }
  ]);

  const bands = [ band ];

  return <EqualizerComponent bands={ bands }/>;
}
```
