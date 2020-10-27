import axios from 'axios'
import { useQuery } from 'react-query'

export default function getProducts() {
  return useQuery('params', () =>
    axios.get('/api/products/slugs').then(
      (res) => res.data
    )
  )
}
