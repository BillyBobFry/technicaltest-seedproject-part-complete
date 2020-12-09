import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  it("should return all deals when no filters applied", () => {
    // Arrange
    const sut = new Store();
    sut.setDeals(mockData.deals);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  it("should return only the 4 broadband only deals when only the broadband filter is applied", () => {
    // Arrange
    const sut = new Store();
    const broadbandDeals = mockData.deals.filter(
      (deal) =>
        deal.productTypes.includes("Broadband") &&
        deal.productTypes.length === 1
    );
    sut.setProductFilter("broadband");

    // Act
    const matchingDeals = sut.deals;
    const matchingDealIDs = sut.deals.map((deal) => deal.id);

    // Assert
    expect(matchingDeals).toHaveLength(4);
    expect(
      broadbandDeals.every((deal) => matchingDealIDs.includes(deal.id))
    ).toBeTruthy();
  });

  it("should return only the 4 broadband + tv deals when broadband filter and the tv filter are applied", () => {
    // Arrange
    const sut = new Store();
    const broadbandAndTVDeals = mockData.deals.filter(
      (deal) =>
        deal.productTypes.includes("Broadband") &&
        deal.productTypes.includes("TV")
    );
    sut.setProductFilter("broadband");
    sut.setProductFilter("tv");

    // Act
    const matchingDeals = sut.deals;
    const matchingDealIDs = sut.deals.map((deal) => deal.id);

    // Assert
    expect(matchingDeals).toHaveLength(4);
    expect(
      broadbandAndTVDeals.every((deal) => matchingDealIDs.includes(deal.id))
    ).toBeTruthy();
  });

  it("should return only the 1 broadband + mobile deal when broadband filter and the mobile filter are applied", () => {
    // Arrange
    const sut = new Store();
    const broadbandAndMobileDeals = mockData.deals.filter(
      (deal) =>
        deal.productTypes.includes("Broadband") &&
        deal.productTypes.includes("Mobile")
    );
    sut.setProductFilter("broadband");
    sut.setProductFilter("mobile");

    // Act
    const matchingDeals = sut.deals;
    const matchingDealIDs = sut.deals.map((deal) => deal.id);

    // Assert
    expect(matchingDeals).toHaveLength(1);
    expect(
      broadbandAndMobileDeals.every((deal) => matchingDealIDs.includes(deal.id))
    ).toBeTruthy();
  });

  it("should return only the 1 sky deal when only the Sky filter is applied", () => {
    // Arrange
    const sut = new Store();
    const skyID = mockData.deals.find((deal) => deal.provider.name === "Sky")
      .provider.id;
    const skyDeals = mockData.deals.filter(
      (deal) => deal.provider.name === "Sky"
    );
    sut.setProviderFilter(String(skyID));

    // Act
    const matchingDeals = sut.deals;
    const matchingDealIDs = sut.deals.map((deal) => deal.id);

    // Assert
    expect(matchingDeals).toHaveLength(1);
    expect(
      skyDeals.every((deal) => matchingDealIDs.includes(deal.id))
    ).toBeTruthy();
  });

  it("should return 2 BT broadband + tv deals when the BT, broadband and TV filters are applied", () => {
    // Arrange
    const sut = new Store();
    const btID = mockData.deals.find((deal) => deal.provider.name === "BT")
      .provider.id;
    const btBBAndTvDeals = mockData.deals.filter(
      (deal) => deal.provider.name === "Sky"
    );
    sut.setProviderFilter(String(btID));
    sut.setProductFilter("broadband");
    sut.setProductFilter("tv");

    // Act
    const matchingDeals = sut.deals;
    const matchingDealIDs = sut.deals.map((deal) => deal.id);

    // Assert
    expect(matchingDeals).toHaveLength(2);
    expect(
      btBBAndTvDeals.every((deal) => matchingDealIDs.includes(deal.id))
    ).toBeTruthy();
  });
});
