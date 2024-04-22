import './Footer.css';
import { IconLocation, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import { TextInput, rem } from '@mantine/core';
const Footer = () => {
    return (
        <div className='d-flex flex-row barra justify-content-end '>
            {/* Enlaces a las redes sociales */}
            <div className="margin">
                <a href='https://www.facebook.com/'><IconBrandFacebook style={{ width: rem(60), height: rem(60), color: '#FFF' }} /></a>
                <a href='https://www.instagram.com/'><IconBrandInstagram style={{ width: rem(60), height: rem(60), color: '#FFF' }} /></a>
            </div>
        </div>
    );
};

export default Footer;
