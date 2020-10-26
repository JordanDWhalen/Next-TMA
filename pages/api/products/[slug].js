import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  process.env.CMS_API
);

const singleProduct = (slug) => {
  return `{
    product(where: {slug: "${slug}"}) {
      id
      title
      productDescription{
        html
      }
    }
  }`
};

export default async (_, res) => {
  const singleProductArray = [];
  try {
    const data = await graphcms.request(singleProduct(_.query.slug));
    singleProductArray.push({
      id: data.product.id,
      title: data.product.title,
      description: data.product.productDescription.html
    })
    res.json( singleProductArray[0] );
  } catch (err) {
    res.json({ error: err.message });
  }
}
