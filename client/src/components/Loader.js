import React from 'react'
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";


function Loader() {

    let [loading, setLoading] = useState(true);

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };


    return (
        <div style={{marginTop:'150px'}}>
            <div className="sweet-loading text-center">

                <HashLoader
                         loading={loading}
                         color = '#6D9886'
                         cssOverride={override}
                         size={120}
                         aria-label="Loading Spinner"
                         data-testid="loader"
                />
            </div>

        </div>
    )
}

export default Loader