import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function getSingleProduct(slug) {
  return useQuery('product', () =>
    axios.get(`/api/products/${slug}`).then(
      (res) => res.data
    )
  )
}
