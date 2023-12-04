# `useWidgetsBindings`

Create a binding or a list of bindings with a widget. Make sure to cache the binding descriptions
inside of a memo to prevent the bindings to be re-installed on each re-render.

```ts
useWidgetsBindings(widgets, bindings);
```

- **`widgets`**_`: Widget[]`_ - The widgets to bind to.
- **`bindings`**_`: (IBindingDescription | IBindingDescription[])[]`_ - The
  description of the binding(s) to create for each widget.

## Usage

```jsx
import { useWidgets, useWidgetsBindings } from '@deutschesoft/use-aux-widgets';
import { EqBand } from '@deutschesoft/aux-widgets/src/index.pure.js';

const bandOptions = [
    {
        type: 'parametric',
        label: 'Band#1'
    },
    {
        type: 'parametric',
        label: 'Band#2'
    }
];

function Equalizer(props) {
  const { bandProperties } = props;
  const bands = useWidgets(EqBand, bandOptions);

  const bindingOptions = useMemo(() => {
      return bandProperties.map((band) => {
          const { gain$, frequency$, q$ } = band;
          return [
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
          ];
      });
  }, [ bandProperties ]);
  
  useWidgetsBindings(bands, bindingOptions);

  return <EqualizerComponent bands={ bands }/>;
}
```
