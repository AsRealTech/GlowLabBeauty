import styled from 'styled-components';
import { useState, useRef } from 'react';

// Render Navigation
export function RenderNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navListRef = useRef(null);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <Nav>
            <Logo href="/">GlowLab Beauty</Logo>
            <NavList ref={navListRef} isOpen={isMenuOpen}>
                <li><a href="/" onClick={handleLinkClick}>Home</a></li>
                <li><a href="#ingredients" onClick={handleLinkClick}>Ingredients</a></li>
                <li><a href="#products" onClick={handleLinkClick}>Products</a></li>
                <li><a href="#tips" onClick={handleLinkClick}>Tips</a></li>
                <li><a href="#" onClick={handleLinkClick}>About</a></li>
                <li><a href="/login" onClick={handleLinkClick}>Login</a></li>
            </NavList>
            <MenuToggle 
                onClick={handleToggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
            >
                {isMenuOpen ? '✕' : '☰'}
            </MenuToggle>
        </Nav>
    );
}

const MenuToggle = styled.button`
    display: none;
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #333;
    padding: 8px;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f8f8f8;

    @media (max-width: 768px) {
        flex-direction: flex;
        align-items: flex-start;
    }
`;

const Logo = styled.a`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;

    li a {
        text-decoration: none;
        color: #333;
        font-size: 16px;
    }

    li a:hover {
        color: #007BFF;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
        display: ${props => props.isOpen ? 'flex' : 'none'};
    }
`;