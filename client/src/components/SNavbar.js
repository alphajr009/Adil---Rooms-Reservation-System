import React from 'react'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/slogin'
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand a1" href="/home">Adil</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon" ><i class="fa-solid fa-bars" style={{ color: 'white' }}> </i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {user ? (<>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i className='fa fa-user' ></i> {user.name}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/home">Home</a>
                                    <a className="dropdown-item" href="/profile">Dashboard</a>
                                    {user.isAdmin ? <a className="dropdown-item" href="/admin" >Admin</a> : null}
                                    <a className="dropdown-item" href="/slogin" onClick={logout}>Logout</a>
                                </div>
                            </div>
                        </>
                        ) : (
                            <>
                                <li className="nav-item active">
                                    <a className="nav-link a1" href="/sregister">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link a1" href="/slogin">Login</a>
                                </li>

                            </>
                        )}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar