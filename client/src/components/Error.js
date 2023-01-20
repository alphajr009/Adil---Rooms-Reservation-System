import React from 'react'

function Error({message}) {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        </div>
    )
}

export default Error