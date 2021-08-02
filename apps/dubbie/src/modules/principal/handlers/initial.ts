import { GetStaticProps } from "next";
import eccomercejs from "@dubbie/lib/eccomece";
import { Product, Category } from "@dubbie/@types/eccomerce.types";

export type PropsHandler = {
  products: Product[];
  categories: Category[];
};

const handler: GetStaticProps = async () => {
  const { data: products } = await eccomercejs.products.list();
  const { data: categories } = await eccomercejs.categories.list();

  return {
    props: {
      products,
      categories,
    },
  };
};

export default handler;
