import { useWidgetInteraction } from '../../index';

export function run(widget): boolean {
  const isInteracting = useWidgetInteraction(widget);

  return isInteracting;
}
