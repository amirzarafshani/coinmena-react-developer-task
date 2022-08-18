import { AssetsResp } from '../interfaces'

export const comareByNameDESC = (a: AssetsResp, b: AssetsResp) => {
  let comparison = 0;
  if (a.name > b.name) {
    comparison = 1;
  } else if (a.name < b.name) {
    comparison = -1;
  }
  return comparison;
}

export const compareByNameASC = (a: AssetsResp, b: AssetsResp) => {
  let comparison = 0;
  if (a.name > b.name) {
    comparison = 1;
  } else if (a.name < b.name) {
    comparison = -1;
  }
  return comparison * -1;
}

export const comareByPriceDESC = (a: AssetsResp, b: AssetsResp) => {
  const a_price = a.metrics.market_data.price_usd;
  const b_price = b.metrics.market_data.price_usd;

  let comparison = 0;
  if (a_price > b_price) {
    comparison = 1;
  } else if (a_price < b_price) {
    comparison = -1;
  }
  return comparison;
}

export const comareByPriceASC = (a: AssetsResp, b: AssetsResp) => {
  const a_price = a.metrics.market_data.price_usd;
  const b_price = b.metrics.market_data.price_usd;

  let comparison = 0;
  if (a_price > b_price) {
    comparison = 1;
  } else if (a_price < b_price) {
    comparison = -1;
  }
  return comparison * -1;
}
