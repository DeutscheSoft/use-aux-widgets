import { createRef, Component, createElement } from 'react';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure.js';
import { Bindings } from '@deutschesoft/awml/src/bindings.js';
import { hasOwnProperty } from './hasOwnProperty.js';
import { forEachChangedProperty } from './forEachChangedProperty.js';

function createBindingDescription(defaultDescription, value) {
  if (value instanceof DynamicValue) {
    return {
      ...defaultDescription,
      backendValue: value,
    };
  } else if (typeof value === 'object') {
    return {
      ...defaultDescription,
      ...value,
    };
  } else if (value === undefined || value === null) {
    return null;
  } else {
    throw new TypeError('Unexpected value for binding description. Expected DynamicValue or BindingDescription.');
  }
}

function initializeEventSubscriptions(auxWidget, eventSubscriptions, props) {
  for (let name in props) {
    if (!name.startsWith('on')) continue;
    const value = props[name];
    const eventName = name.slice(2).toLowerCase();

    if (typeof value === 'function') {
      eventSubscriptions.set(eventName, auxWidget.subscribe(eventName, value));
    } else {
      throw new TypeError('Expected function as event handler.');
    }
  }
}

const classListSplit = /( \t\n\r\f)+/;

function updateClassName(element, className, prevClassName, defaultClassNames) {
  const classNames = className.split(classListSplit);
  const prevClassNames = prevClassName.split(classListSplit);

  classNames.forEach((name) => {
    if (name === '' || prevClassNames.includes(name) || defaultClassNames.includes(name)) return;
    element.classList.add(name);
  });
  prevClassNames.forEach((name) => {
    if (name === '' || classNames.includes(name) || defaultClassNames.includes(name)) return;
    element.classList.remove(name);
  });
}

function updateRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (typeof ref === 'object' && 'current' in ref) {
    ref.current = value;
  } else {
    throw TypeError('Expected react Ref or callback.');
  }
}

/**
 * Creates a React component for the given widget type. The resulting
 * component has properties for all widget options and events.
 * Properties based on options have the same name as the corresponding option
 * name.
 *
 * In addition to options, all events defined by the widget are available using
 * the standard React convention. This includes all DOM events - as well as -
 * all event of the widget itself. For example, the `useraction` event
 * can be subscribed by passing a callback to the `onUseraction` property.
 *
 * In addition it is possible to define a set of bindings which can be used to
 * connect widget options to AWML DynamicValues. Each defined binding will
 * become available as a property under the same name. The convention is to use
 * the corresponding option name followed by a `$` character. The binding
 * specification follows the
 * [IBindingDescription](http://docs.deuso.de/AWMLv2/api/classes.html#ibindingdescription)
 * interface of AWML.
 *
 * @param {Function} Widget
 *      The aux widget to create a component from.
 * @param {Object} [bindingDefaults={}]
 *      An object which specifies the possible bindings of the component. By
 *      convention binding names usually consist of the name of the widget
 *      option followed by a `$` character. The specification of the binding
 *      must follow the `IBindingDescription` interface.
 * @param {Object} [defaultOptions={}]
 *      A set of widget default options.
 * @param {string} [defaultClassName='']
 *      A default class name. This class name is added to the `className`
 *      property. Usually it is used to give certain styles to a specific
 *      component. This can be used to create several components for the same
 *      widget with slightly different styles.
 */
export function componentFromWidget(Widget, bindingDefaults, defaultOptions, defaultClassName) {
  if (!bindingDefaults)
    bindingDefaults = {};

  if (!defaultOptions)
    defaultOptions = {};

  const defaultClassNames = defaultClassName
    ? defaultClassName.split(classListSplit).filter((item) => item.length)
    : [];

  const optionTypes = Widget.getOptionTypes();

  const propertyToBindingIndex = new Map(
    Object.keys(bindingDefaults).map(
      (propertyName, index) => [ propertyName, index ]
    )
  );
  const indexToBindingDefault = Object.values(bindingDefaults);
  const indexToBindingPropertyName = Object.keys(bindingDefaults);

  function optionsFromProps(props) {
    const result = Object.assign({ }, defaultOptions);

    for (let key in props) {
      if (optionTypes[key]) {
        result[key] = props[key];
      }
    }

    return result;
  }

  function initializeBindingDescriptions(bindingDescriptions, props) {
    let bindingsChanged = false;

    for (let i = 0; i < bindingDescriptions.length; i++) {
      const propertyName = indexToBindingPropertyName[i];

      if (!hasOwnProperty(props, propertyName)) continue;
      const value = props[propertyName];
      bindingDescriptions[i] = createBindingDescription(indexToBindingDefault[i], value);
      bindingsChanged = true;
    }

    return bindingsChanged;
  }

  return class extends Component {
    constructor() {
      super();
      this.elementRef = createRef();
      this.auxWidget = null;
      this.bindings = null;
      this.bindingDescriptions = new Array(indexToBindingDefault.length).fill(null);
      this.eventSubscriptions = new Map();
    }

    componentDidMount() {
      const element = this.elementRef.current;
      const props = this.props;
      const auxWidget = new Widget({ element, ...optionsFromProps(props) });
      const bindingDescriptions = this.bindingDescriptions;
      const bindings = new Bindings(auxWidget);

      auxWidget.setParent(null);
      auxWidget.enableDraw();
      this.auxWidget = auxWidget;
      this.bindings = bindings;

      if (initializeBindingDescriptions(bindingDescriptions, props)) {
        bindings.update(bindingDescriptions.filter((description) => !!description));
      }

      initializeEventSubscriptions(auxWidget, this.eventSubscriptions, props);

      defaultClassNames.forEach((name) => element.classList.add(name));

      if (hasOwnProperty(props, 'className'))
        updateClassName(element, props.className, '', defaultClassNames);

      if (props.widgetRef)
        updateRef(props.widgetRef, auxWidget);
    }

    componentDidUpdate(prevProps) {
      const { auxWidget, props, bindingDescriptions, eventSubscriptions } = this;

      let bindingsChanged = false;

      forEachChangedProperty(
        prevProps, props,
        (name, prevValue) => {
          if (name.endsWith('$')) {
            const bindingIndex = propertyToBindingIndex.get(name);

            // This binding does not exist. We have already warned about
            // it when it was set.
            if (bindingIndex === void 0) return;

            bindingDescriptions[bindingIndex] = null;
            bindingsChanged = true;
          } else if (name.startsWith('on')) {
            const eventName = name.slice(2).toLowerCase();
            const unsubscribe = eventSubscriptions.get(eventName);
            eventSubscriptions.delete(eventName);

            if (unsubscribe)
              unsubscribe();
          } else if (hasOwnProperty(optionTypes, name)) {
            if (hasOwnProperty(defaultOptions, name)) {
              auxWidget.set(name, defaultOptions[name]);
            } else {
              auxWidget.reset(name);
            }
          } else if (name === 'className') {
            updateClassName(this.elementRef.current, '', prevValue, defaultClassNames);
          }
        },
        (name, value, prevValue) => {
          if (name.endsWith('$')) {
            const bindingIndex = propertyToBindingIndex.get(name);

            // This binding does not exist. We have already warned about
            // it when it was set.
            if (bindingIndex === void 0) {
              console.warn('Unknown binding %o=%o.',
                           name, value);
              return;
            }

            bindingDescriptions[bindingIndex] =
              createBindingDescription(indexToBindingDefault[bindingIndex], value);
            bindingsChanged = true;
          } else if (name.startsWith('on')) {
            const eventName = name.slice(2).toLowerCase();
            const unsubscribe = eventSubscriptions.get(eventName);

            if (unsubscribe)
              unsubscribe();

            if (typeof value === 'function') {
              eventSubscriptions.set(eventName, auxWidget.subscribe(eventName, value));
            } else {
              eventSubscriptions.delete(eventName);
              throw new TypeError('Expected function as event handler.');
            }
          } else if (hasOwnProperty(optionTypes, name)) {
            auxWidget.set(name, value);
          } else if (name === 'className') {
            updateClassName(this.elementRef.current, value, prevValue, defaultClassNames);
          } else if (name === 'widgetRef') {
            updateRef(value, auxWidget);
          } else {
            console.warn('Unknown property %o=%o', name, value);
          }
        });

      if (bindingsChanged)
        this.bindings.update(bindingDescriptions.filter((description) => !!description));
    }

    componentWillUnmount() {
      const { auxWidget, bindings, eventSubscriptions, props } = this;
      bindings.dispose();
      eventSubscriptions.clear();

      if (auxWidget)
        auxWidget.destroy();

      if (props.widgetRef)
        updateRef(props.widgetRef, null);

      this.auxWidget = null;
    }

    render() {
      return createElement('div', { ref: this.elementRef });
    }
  };
}
