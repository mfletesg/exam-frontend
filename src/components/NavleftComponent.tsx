import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const NavleftComponent = () => {

    const location = useLocation(); // Hook de React Router para obtener la ubicación actual
    const [activeLink, setActiveLink] = useState(location.pathname); // Estado para la ruta activa

    useEffect(() => {
        setActiveLink(location.pathname); // Actualiza el enlace activo cuando cambia la ruta
    }, [location]);
    
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className={`nav-link ${activeLink === '/' ? 'active' : ''}`} href="/">
                            <span data-feather="home"></span>
                            Ejercicio 1 <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeLink === '/figures' ? 'active' : ''}`} href="/figures">
                            <span data-feather="file"></span>
                            Ejercicio 2
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeLink === '/bankAccounts' ? 'active' : ''}`} href="/bankAccounts">
                            <span data-feather="shopping-cart"></span>
                            Ejercicio 3
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
