import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBook, FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className='brand'><h1>BOOKIFY</h1></div>
            <nav className="navbar navbar-expand sticky-top">
                <div className="container">

                    <div className={`navbar-collapse`}>
                        <ul className="navbar-nav ml-auto ">
                            <li className="nav-item" title='Home'>
                                <span className="nav-link" onClick={() => navigate('/')}><FaHome className='nav-icon' /> </span>
                            </li>
                            <li className="nav-item" title='Explore Topics'>
                                <span className="nav-link" onClick={() => navigate('/explore')} ><FaBook className='nav-icon' /> </span>
                            </li>
                            <li className="nav-item" title='Find a Book'>
                                <span className="nav-link" onClick={() => navigate('/search')}><FaSearch className='nav-icon' /> </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
