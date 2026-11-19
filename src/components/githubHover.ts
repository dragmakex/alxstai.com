export const contributionOpacities = [.07, .85, 1, 1, 1];

// Keep the reference's hover motion, with stronger resting fills for legibility.
export function advanceContributionHover(current: number, distance: number, level: number) {
  const target = Math.max(0, 1 - distance / 120) ** 2;
  const influence = current + (target - current) * .2;
  return {
    influence,
    scale: 1 + influence * .5,
    opacity: Math.min(1, contributionOpacities[level] + influence * (level ? .45 : .24)),
  };
}
