/**
 * TODO:
 *
 * pending pass to namespace
 */
export interface Asset {
  id: string;
  url: string;
  description: string | null;
  is_image: boolean;
  filename: string;
  file_extension: string;
  image_dimensions: {
    width: number;
    height: number;
  };
  file_size?: number | undefined;
  meta: any;
  created_at: number;
  updated_at: number;
}

export interface Price {
  raw: number;
  formatted: string;
  formatted_with_symbol: string;
  formatted_with_code: string;
}

export interface ProductVariantGroup {
  id: string;
  name: string;
  meta?: any;
  created: number | null;
  updated: number | null;
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  id: string;
  name: string;
  price: Price;
  assets: Asset[];
  meta: any;
  created: number | null;
  updated: number | null;
}

export interface Product {
  id: string;
  created: number;
  updated: number;
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  price: Price;
  inventory: {
    managed: boolean;
    available: number;
  };
  media: {
    type: string;
    source: string;
  };
  sku: string | null;
  sort_order: number;
  seo: {
    title: string | null;
    description: string | null;
  };
  thank_you_url: string | null;
  meta: any;
  conditionals: {
    is_active: boolean;
    is_tax_exempt: boolean;
    is_pay_what_you_want: boolean;
    is_inventory_managed: boolean;
    is_sold_out: boolean;
    has_digital_delivery: boolean;
    has_physical_delivery: boolean;
    has_images: boolean;
    has_video: boolean;
    has_rich_embed: boolean;
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    collects_billing_address: boolean;
    collects_extra_fields: boolean;
  };
  is: {
    active: boolean;
    tax_exempt: boolean;
    pay_what_you_want: boolean;
    inventory_managed: boolean;
    sold_out: boolean;
  };
  has: {
    digital_delivery: boolean;
    physical_delivery: boolean;
    images: boolean;
    video: boolean;
    rich_embed: boolean;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  checkout_url: {
    checkout: string;
    display: string;
  };
  extra_fields: any[];
  variant_groups: ProductVariantGroup[];
  categories: Array<{
    id: string;
    slug: string;
    name: string;
  }>;
  assets: Asset[];
  related_products: any[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  products: number;
  created: number;
  meta: any;
}
