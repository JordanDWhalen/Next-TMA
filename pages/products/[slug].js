// TODO: Basically the entire file.
import Head from 'next/head'
import getSingleProduct from '../../hooks/getSingleProduct'
import { ReactQueryDevtools } from 'react-query-devtools'
import { useRouter } from 'next/router'
import parse from 'html-react-parser'

export default function Page() {
  const router = useRouter()
  const singleProduct = getSingleProduct(router.query.slug)

  return <div>
    <h1>TeachMeAutomation{singleProduct.isFetching ? <small>...</small> : null }</h1>
    { singleProduct.isLoading ? (
      <span>Loading...</span>
    ) : singleProduct.isError ? (
      singleProduct.error.message
    ) : (
      <div>
        <div className="singleProduct" key={singleProduct.data.id}>
          <h1>{singleProduct.data.title}</h1>
          <div className="singleProductDescription">
            {parse(singleProduct.data.description)}
          </div>
        </div>
      </div>
    )}
  </div>,
  <ReactQueryDevtools initialIsOpen={false} />
}
