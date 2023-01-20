import React from 'react'

function Success({message}) {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                {message}
            </div>
        </div>
    )
}

export default Success