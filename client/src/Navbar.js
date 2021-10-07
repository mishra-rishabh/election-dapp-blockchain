import React from 'react' ;

const Navbar = ( {account} ) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-5">
      <p className="navbar-brand my-auto mx-4">Election Dapp</p>
      <ul className="navbar-nav">
        <li className="nav-item text-white mx-4"><h6>Account address:</h6> {account}</li>
      </ul>
    </nav>
  )
}

export default Navbar ;