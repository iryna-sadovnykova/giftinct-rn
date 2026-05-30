import type { WhyDidYouRenderComponentMember } from '@welldone-software/why-did-you-render';

interface WdyrTrackable {
  whyDidYouRender?: WhyDidYouRenderComponentMember;
}

/** Assigns `whyDidYouRender` on a component (dev tooling only). */
export const trackComponent = (
  component: object,
  options: WhyDidYouRenderComponentMember = true,
): void => {
  (component as WdyrTrackable).whyDidYouRender = options;
};
