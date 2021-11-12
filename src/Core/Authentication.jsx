import React from 'react'
import { useHistory } from 'react-router-dom'
import auth from '../utils/auth'

const Authentication = (props) => {
    const history = useHistory()
    let component
    const { children } = props
    
    if (!auth()) {
        history.replace('/')
    } else {
        component = children
    }

    return (
        <>
            {component}
        </>
    )
}

export default Authentication
