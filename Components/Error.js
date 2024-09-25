import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {

  const error = useRouteError()

  return (
    <>
      <div className='error-page' style={{ textAlign: 'center', marginTop: '130px' }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ color: '#ed2626', fontSize: '300px' }}></i>
        <h2 style={{ fontSize: '100px', marginTop: '0', textShadow: "6px 4px grey" }}>{error.status}</h2>
      </div>
    </>
  )
}

export default Error
