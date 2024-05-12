import './Header.css';
import { useNavigate,Link } from 'react-router-dom';
import { useUser } from '../Usuario/UserProvider';
import { useEffect,React } from 'react';
const Header = (props) => {
    const navigate = useNavigate();
    const { user, updateUser } = useUser();
    const clickImage = () =>{
        navigate('/');
    }
    useEffect(() => {
      console.log(user);
  }, [user]);
    return (
        <div className="row barra">
        <div className="col-md-4 col-8">
          <img onClick={clickImage} className='img-fluid padd' src='/assets/logo.png' alt='link logotipo'></img>
        </div>
        <div className='col-lg-5 offset-lg-3 col-8 d-flex align-items-center'>
          <Link to="/" className='link'>INICIO</Link>
          <Link to="/digs" className='link'>ALOJAMIENTOS</Link>
          <Link to="/experiencies" className='link'>EXPERIENCIAS</Link>
          <Link to="/discover" className='link'>DESCUBRE ASTURIAS</Link>
          {!user.nombre?(<Link to="/access" className='link'>ACCESO</Link>):(<div>Bienvenido {user.nombre}</div>)}
        </div>
      </div>
    );
};
export default Header;