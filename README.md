# `use-aux-widgets`

A collection of hooks for integrating
[`aux-widgets`](https://github.com/DeutscheSoft/aux-widgets) and
[`awml`](https://github.com/DeutscheSoft/AWML) with react applications.

## Installation

    npm i '@deutschesoft/use-aux-widgets'

## Usage

- [`componentFromWidget`](./docs/componentFromWidget.md) &mdash; Creates a React
  component from an aux widget.
- [`useBackend`](./docs/useBackend.md) &mdash; Creates a backend which
  automatically reconnects.
- [`useDebouncedState`](./docs/useDebouncedState.md) &mdash; Creates a state
  which is debounced, i.e. it will change at most once during a given time
  interval.
- [`useDynamicValue`](./docs/useDynamicValue.md) &mdash; Creates a state which
  is synchronized with a DynamicValue bidirectionally.
- [`useDynamicValueReadonly`](./docs/useDynamicValueReadonly.md) &mdash; Creates
  a state which is synchronized from a DynamicValue.
- [`useEventHandler`](./docs/useEventHandler.md) &mdash; A simple hook which
  stores event callbacks in a ref.
- [`useRefAsCallback`](./docs/useRefAsCallback.md) &mdash; A simple hook which
  returns a cached wrapper function for a function stored inside of a ref.
- [`useWidget`](./docs/useWidget.md) &mdash; A hook for creating widgets
  programmatically.
- [`useWidgetBinding`](./docs/useWidgetBinding.md) &mdash; A hook for creating
  two-way bindings with widgets programmatically.
- [`useWidgetEvent`](./docs/useWidgetEvent.md) &mdash; A hook for subscribing to
  events of a widget programmatically.
- [`useWidgetEvents`](./docs/useWidgetEvents.md) &mdash; A hook for subscribing to
  a list of events of a widget.
- [`useWidgetInteraction`](./docs/useWidgetInteraction.md) &mdash; Creates a
  state which tracks user interaction with a widget.
- [`useWidgetOption`](./docs/useWidgetOption.md) &mdash; Creates a state which
  synchronizes with the option of a widget.
- [`useWidgets`](./docs/useWidgets.md) &mdash; A hook for creating a list of
  widgets programmatically.

## License

`use-aux-widgets` is available under the terms of the GNU General Public License version 2.
See the files `COPYING` and `gplv2.txt` for details.

Copyright (c) 2022 DeusO GmbH
