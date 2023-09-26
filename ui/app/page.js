'use client'

import store from '@/Stores/Stores'
import Alert from '@/components/Alert'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import Navbar from '@/components/Navbar'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'

export default function Home() {



  return (
    <body>
      <Provider store={store}>
        <Navbar />
        <Card />
        <Alert />
        <Modal />
      </Provider >
    </body>

  )
}
