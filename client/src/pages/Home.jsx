import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const Home = () => {
  return (
    <>
      <div className={`h-full w-full flex items-center justify-center` }>
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
          <span>Select a friend to chat</span>
        </div>

      </div>
    </>
  )
}

export default AppLayout()(Home);