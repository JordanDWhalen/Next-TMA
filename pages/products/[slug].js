import { useRouter } from 'next/router'
import getSingleProduct from '../../hooks/getSingleProduct'
import parse from 'html-react-parser'

const Product = ({title, description}) => {
  return (
    <div>
      <div className="singleProduct">
        <h1>{title}</h1>
        <div className="singleProductDescription">
          {parse(description)}
        </div>
      </div>
    </div>
  )
}

Product.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://localhost:3000/api/products/${query.slug}`);
  const productData = res.json();

  return productData;
}

export default Product;
