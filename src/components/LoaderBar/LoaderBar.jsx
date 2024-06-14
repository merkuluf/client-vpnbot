// LoaderBar.js
import React from 'react'
import './LoaderBar.scss'

function LoaderBar({ margin }) {
    return (
        <div
            style={{
                marginTop: margin ? margin : '0px',
            }}
            className='loader-bar'
        >
            <div className='loader-progress'></div>
        </div>
    )
}

export default LoaderBar
