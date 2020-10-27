import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  process.env.CMS_API
);

const allProducts = `{
  products {
    slug
  }
}`;

export default async (_, res) => {
  try {
    const productsArray = [];
    const { products } = await graphcms.request(allProducts);
    products.forEach((item) => {
      productsArray.push({
        params: {
          slug: item.slug
        }
      })
    })
    res.json(productsArray);
  } catch (err) {
    res.json({ error: true });
  }
}
