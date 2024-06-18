import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center h-14 w-full bg-lime-950'>
        <h1 className='text-2xl font-bold text-white m-4'>MAPPER</h1>
        <div className='flex text-white cursor-pointer'>
            <div className='p-4 ml-2 hover:bg-lime-600'><a href="#"> Factory </a></div>
            <div className='p-4 ml-2 hover:bg-lime-600'><a href="#"> Kapsiwon </a></div>
            <div className='p-4 ml-2 hover:bg-lime-600'><a href="#"> Mokong</a></div>
            <div className='p-4 ml-2 hover:bg-lime-600'><a href="#"> Taito</a></div>
        </div>
    </div>
  )
}

export default Header