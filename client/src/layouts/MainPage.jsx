import React from 'react'
import {FaLink} from "react-icons/fa"
import Form from '../components/Form'
import Table from '../components/Table'
const MainPage = () => {
  return (
    <div className='bg-blue-50 min-h-screen'>
      <header className='text-blue-600 bg-white flex gap-2 items-center  p-5'>
        <FaLink className='w-8 h-8'/>
        <h1 className='font-bold text-2xl'>TinyUrl</h1>
      </header>
      <main className='m-8'>
        <Form/>
        <Table/>
      </main>
    </div>
  )
}

export default MainPage
