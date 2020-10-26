import axios from 'axios'
import { useQuery } from 'react-query'

export default function getProducts() {
  return useQuery('products', () =>
    axios.get('/api/products').then(
      (res) => res.data
    )
  )
}
