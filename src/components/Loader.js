import React from 'react'
import loader from './assets/loader.gif'

const Loader = () => {
  return (
    <>
      <div className='loader' style={{ 
        display: 'flex', justifyContent: 'center', 
        alignContent: 'center', 
        height: '20vh',
        marginTop: '30vh'
        }}>
        <img src={loader} />

      </div>
    </>
  )
}

export default Loader
