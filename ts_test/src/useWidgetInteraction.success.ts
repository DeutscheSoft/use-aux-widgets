import { useWidgetInteraction } from '../../index.js';

export function run(widget): boolean {
  const isInteracting = useWidgetInteraction(widget);

  return isInteracting;
}
