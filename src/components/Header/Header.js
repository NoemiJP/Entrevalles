import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../Usuario/UserProvider';
import { useEffect, React, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconHeart, IconStar, IconMessage, IconSettings, IconPlayerPause, IconTrash, IconSwitchHorizontal, IconChevronDown, } from '@tabler/icons-react';
import { Container, Box, Avatar, UnstyledButton, Group, Text, Menu, Tabs, Burger, rem, useMantineTheme, } from '@mantine/core';


const Header = (props) => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const clickImage = () => {
    navigate('/');
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const links = [
    { link: '/', label: 'INICIO' },
    { link: '/digs', label: 'ALOJAMIENTOS' },
    { link: '/experiencies', label: 'EXPERIENCIAS' },
    { link: '/discover', label: 'DESCUBRE ASTURIAS' }
  ];

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className="link"
    >
      {link.label}
    </Link>
  ));

  const logout = () => {
    updateUser({});
  }

  const itemsMobile = links.map((link) => (
    <Menu.Item>
      <Link
        key={link.label}
        to={link.link}
        className="link"
      >
        {link.label}
      </Link>
    </Menu.Item>
  ));

  return (
    /*<div className="row barra">
      <div className="col-md-4 col-8">
        <img onClick={clickImage} className='img-fluid padd' src='/assets/logo.png' alt='link logotipo'></img>
      </div>
      <div className='col-lg-5 offset-lg-3 col-8 d-flex align-items-center'>
        <Link to="/" className='link'>INICIO</Link>
        <Link to="/digs" className='link'>ALOJAMIENTOS</Link>
        <Link to="/experiencies" className='link'>EXPERIENCIAS</Link>
        <Link to="/discover" className='link'>DESCUBRE ASTURIAS</Link>
        {!user.nombre ? (<Link to="/access" className='link'>ACCESO</Link>) : (<div>Bienvenido {user.nombre}</div>)}
      </div>*/


    <header className="header">
      <div className="inner">
        <Group justify="space-between" align="center">
          <Group>
            <Link to="/">
              <img src='/assets/logo.png' alt='link logotipo' style={{ cursor: 'pointer' }}></img></Link>
          </Group>
        </Group>
        <Group hiddenFrom="sm" justify="flex-end">
          <Menu
            width={260}
            position="bottom-end"
          >
            <Menu.Target>
              <Group>
                <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" color="#D9D9C1" />
              </Group>
            </Menu.Target>
            <Menu.Dropdown style={{backgroundColor:"#355D75"}}>
              {itemsMobile}
              {user.nombre == null ? (<Menu.Item><Link
                to="/access"
                className="link"
              >
                ACCESO
              </Link></Menu.Item>) : (null)}
              {user.nombre != null ? (<>
                <Link to="/" className="menuItemLink">
                  <Menu.Item leftSection={<IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                    Mis reservas
                  </Menu.Item></Link>

                <Link to="/" className="menuItemLink">
                  <Menu.Item leftSection={<IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                    Cambiar contraseña
                  </Menu.Item></Link>

                <Link onClick={(e) => logout()} className="menuItemLink">
                  <Menu.Item leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                    Cerrar sesión
                  </Menu.Item></Link></>) : (null)}
            </Menu.Dropdown >
          </Menu>
        </Group>
        <Group className="links" visibleFrom="sm" justify="flex-end">
          {items}
          {user.nombre == null ? (<Link
            to="/access"
            className="link"
          >
            ACCESO
          </Link>) : (null)}
          {user.nombre != null ? (<Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            justify="flex-end"
          >
            <Menu.Target>
              <UnstyledButton>
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={32} />
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
                <Text fw={500}>
                  {user.name}
                </Text>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Bienvenido {user.nombre}</Menu.Label>
              <Link to="/" className="menuItemLink">
                <Menu.Item leftSection={<IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                  Mis reservas
                </Menu.Item></Link>

              <Link to="/newpass" className="menuItemLink">
                <Menu.Item leftSection={<IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                  Cambiar contraseña
                </Menu.Item></Link>

              <Link to="/" className="menuItemLink">
                <Menu.Item leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                  Cerrar sesión
                </Menu.Item></Link>
            </Menu.Dropdown>
          </Menu>
          ) : (null)}
        </Group>
      </div>
    </header>
  );
};
export default Header;