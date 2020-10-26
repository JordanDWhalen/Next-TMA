import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  process.env.CMS_API
);

const allProducts = `{
  products {
    title
    slug
    productDescription {
      html
    }
  }
}`;

export default async (_, res) => {
  try {
    const productsArray = [];
    const { products } = await graphcms.request(allProducts);
    products.forEach((item) => {
      productsArray.push({
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.productDescription.html
      })
    })
    res.json(productsArray);
  } catch (err) {
    res.json({ error: true });
  }
}
