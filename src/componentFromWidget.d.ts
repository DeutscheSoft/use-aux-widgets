import { Component } from 'react';
import { DynamicValue } from '@deutschesoft/awml/src/index.pure';

interface WidgetType<T> extends Function {
  new (options: object): T;
}

interface ReactComponentType<T> extends Function {
  new (): Component<T>;
}

interface IBindingDescriptionIncomplete {
  name: string;
  pipe?: (dv: DynamicValue<any>) => DynamicValue<any>;
  transformReceive?: (value: any) => any;
  transformSend?: (value: any) => any;
  replayReceive?: boolean;
  replaySend?: boolean;
  debug?: boolean;
}

interface BindingDescriptions {
  [name: string]: IBindingDescriptionIncomplete;
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
export function componentFromWidget<T>(
  Widget: WidgetType<T>,
  bindingDefaults?: BindingDescriptions,
  defaultOptions?: object,
  defaultClassName?: string
): ReactComponentType<any>;
