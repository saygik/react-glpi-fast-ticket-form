import React from 'react'
import './bigloader.css'

const BigLoader = () =>
    <div className={'centered'}>
        <div className={'lds-css ng-scope'}>
            <div  className={'lds-double-ring'}>
                <div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </div>

export default BigLoader
