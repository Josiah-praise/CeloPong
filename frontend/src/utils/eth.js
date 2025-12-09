import { formatEther, parseEther } from 'viem';

const ZERO = 0n;
const TWO = 2n;

function safeParseEther(value) {
  if (value === undefined || value === null || value === '') {
    return ZERO;
  }

  try {
    return parseEther(String(value));
  } catch {
    return ZERO;
  }
}

export function computePrizeFromStake(stakeAmount) {
  const stakeWei = safeParseEther(stakeAmount);
  const payoutWei = stakeWei * TWO;

  return {
    stakeWei,
    payoutWei,
    formattedStake: formatEther(stakeWei),
    formattedPayout: formatEther(payoutWei),
  };
}
