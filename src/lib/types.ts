export type Website = {
  id: string;
  name: string;
};

export type SearchResult = {
  websiteName: string;
  productName: string;
  price: number | null;
  url: string;
};
