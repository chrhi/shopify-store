interface CartLineItem
  extends Pick<
    Product,
    | "id"
    | "name"
    | "images"
    | "category"
    | "subcategory"
    | "price"
    | "inventory"
    | "storeId"
  > {
  quantity?: number;
  storeName: string | null;
}
