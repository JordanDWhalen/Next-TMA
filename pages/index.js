import Head from 'next/head'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from '../styles/Home.module.css'
import { ReactQueryDevtools } from 'react-query-devtools'
import getProducts from '../hooks/getProducts'
import parse from 'html-react-parser'

export default function Page() {
  const [ session, loading ] = useSession()
  const allProductsQuery = getProducts()

  return <div>
    <h1>TeachMeAutomation{allProductsQuery.isFetching ? <small>...</small> : null }</h1>
    { !session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in</button>
    </>}
    { session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={signOut}>Sign out</button>
    </>}
    { allProductsQuery.isLoading ? (
      <span>Loading...</span>
    ) : allProductsQuery.isError ? (
      allProductsQuery.error.message
    ) : (
      <div>
        { allProductsQuery.data.map(item => (
          <Link className="productCard" href={`/products/${(item.slug)}`} passhref>
            <a key={item.id} className="productCardLinkWrapper">
              <h1 >
                {item.title}
              </h1>
              {parse(item.description)}
            </a>
          </Link>
       ))}
      </div>
    )}
  </div>
}
