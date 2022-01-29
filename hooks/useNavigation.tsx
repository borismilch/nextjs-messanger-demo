import React from 'react'
import { useRouter } from 'next/router'

export default () => {

  const router = useRouter()

  const pushRouter = (path: string) => {
    router.push(path)
  }

  const backRouter = () => {
    router.back()
  }

  const query = router.query
  const path = router.pathname

  return {pushRouter, backRouter, query, router, path}
}

