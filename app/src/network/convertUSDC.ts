// USDC is denominated in units of 1e^-6

export const convertUnitsToUSDC = (amount: bigint): number => {
  return Number(amount) / 1_000_000
}

export const convertUSDCToUnits = (amount: number): number => {
  return amount * 1_000_000
}
