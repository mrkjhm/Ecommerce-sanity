import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'


export default function Layout({ children }) {
  return (
    <div className='p-[10px]'>
      <Head>
        <title>mrkjhem store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='max-w-[1400px] m-auto w-full'>
        {children}
      </main>
      
    </div>
  )
}
