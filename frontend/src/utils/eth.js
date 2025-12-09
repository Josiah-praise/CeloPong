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

function trimDecimals(value, digits = 4) {
  if (!value.includes('.')) {
    return value;
  }

  const [intPart, fraction = ''] = value.split('.');
  const trimmedFraction = fraction.slice(0, digits).replace(/0+$/, '');

  return trimmedFraction.length > 0 ? `${intPart}.${trimmedFraction}` : intPart;
}

export function formatWeiToEth(weiValue, digits = 4) {
  return trimDecimals(formatEther(weiValue), digits);
}
