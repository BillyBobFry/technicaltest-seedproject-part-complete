import Observable from "./Observable";
import { productTypeMap } from "../utils/dealUtils";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null,
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    const allProductTypes = Array.from(productTypeMap.keys());
    const unselectedProductTypes = allProductTypes.filter(
      (productType) => !this.state.productFilters.includes(productType)
    );

    const filterByProduct = (deal) => {
      if (this.state.productFilters.length === 0) return true;

      /**
       * A deal matches the product filter if:
       * 1) It contains every selected product type
       * 2) It doesn't contain any unselected product types
       */

      const hasAllSelectedProductTypes = this.state.productFilters.every(
        (productType) => {
          const checkType = productTypeMap.get(productType);
          return checkType(deal);
        }
      );

      const doesntHaveAnyUnselectedProductTypes = unselectedProductTypes.every(
        (productType) => {
          const checkType = productTypeMap.get(productType);
          return !checkType(deal);
        }
      );

      return hasAllSelectedProductTypes && doesntHaveAnyUnselectedProductTypes;
    };

    const filterByProvider = (deal) => {
      if (this.state.providerFilter === null) return true;

      return deal.provider.id === Number(this.state.providerFilter);
    };

    return this.state.deals.filter(filterByProduct).filter(filterByProvider);
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
