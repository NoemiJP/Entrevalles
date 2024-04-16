import './Header.css';
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
    const navigate = useNavigate();
    const clickImage = () =>{
        navigate('/');
    }
    return (
        <div className="row barra">
        <div className="col-md-4 col-8">
          <img onClick={clickImage} className='img-fluid padd' src='/assets/logo.png' alt='link logotipo'></img>
        </div>
        <div className='col-lg-5 offset-lg-3 col-8 d-flex align-items-center'>
          <a href="/" className='link'>INICIO</a>
          <a href="/digs" className='link'>ALOJAMIENTOS</a>
          <a href="/experiencies" className='link'>EXPERIENCIAS</a>
          <a href="/discover" className='link'>DESCUBRE ASTURIAS</a>
          <a href="/access" className='link'>ACCESO</a>
        </div>
      </div>
    );
};
export default Header;