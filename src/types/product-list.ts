import { Filter as FilterValue } from "./admin-products";

export type Filter = {
  name: string;
  values: FilterValue[];
}

export type SortByOptions = "relevance" | "new" | "largest" | "smallest" | "";
