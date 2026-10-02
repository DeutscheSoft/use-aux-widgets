import { useWidgetInteraction } from '../../index.js';

export function run(widget: object): boolean {
  const isInteracting = useWidgetInteraction(widget);

  return isInteracting;
}
