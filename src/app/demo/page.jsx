import { Suspense } from 'react'
import Content from './Content'

const Page = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen grid place-items-center text-gray-500">Loading…</div>}>
      <Content />
    </Suspense>
  )
}

export default Page