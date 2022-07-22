// USDC is denominated in units of 1e^-6

export const convertUnitsToUSDC = (amount: bigint | number): number => {
  const num = typeof amount === 'bigint' ? Number(amount) : amount
  return num / 1_000_000
}

export const convertUSDCToUnits = (amount: number): number => {
  return amount * 1_000_000
}
