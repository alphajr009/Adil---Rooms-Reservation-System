import React from 'react'

function Warning({ message }) {
    return (
        <div>
            <div class="alert alert-warning" role="alert">
               {message}
            </div>
        </div>
    )
}

export default Warning