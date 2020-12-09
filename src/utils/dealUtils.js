/**
 * Returns true if a deal is a broadband deal
 * @param {*} deal
 * @returns {boolean}
 */
export const isBroadbandDeal = (deal) =>
  deal.productTypes.includes("Broadband") ||
  deal.productTypes.includes("Fibre Broadband");

/**
 * Returns true if a deal is a mobile deal
 * @param {*} deal
 * @returns {boolean}
 */
export const isMobileDeal = (deal) => deal.productTypes.includes("Mobile");

/**
 * Returns true if a deal is a TV deal
 * @param {*} deal
 * @returns {boolean}
 */
export const isTVDeal = (deal) => deal.productTypes.includes("TV");

/**
 * Map of product type to function that gets whether a deal is of that product type
 */
export const productTypeMap = new Map([
  ["mobile", isMobileDeal],
  ["tv", isTVDeal],
  ["broadband", isBroadbandDeal],
]);
