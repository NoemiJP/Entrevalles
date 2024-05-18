import './Footer.css';
import { Anchor, Group, ActionIcon, rem, TextInput, Text } from '@mantine/core';
import { IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram, IconCopyright } from '@tabler/icons-react';

const links = [
    { link: '#', label: 'Contactar' },
    { link: '#', label: 'Política de Privacidad' },
    { link: '#', label: 'Declaración Cookies' },
    { link: '#', label: 'Aviso legal' },
];

export function Footer() {
    const items = links.map((link) => (
        <Anchor
            c="#ffffff"
            key={link.label}
            href={link.link}
            lh={1}
            size="md"
        >
            {link.label}
        </Anchor>
    ));

    return (

        <div className='footer'>
            <div className='inner' >
                <Text size="md" ><IconCopyright style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
                     2024 Derechos reservados</Text>


                <Group className={links} >{items}</Group>

                <Group gap="xs" justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" variant="default" radius="xl"  style={{ backgroundColor: '#355d75', color: '#ffffff' }}>
                        < IconBrandLinkedin style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl" style={{ backgroundColor: '#355d75', color: '#ffffff' }}>
                        <IconBrandFacebook style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl" style={{ backgroundColor: '#355d75', color: '#ffffff' }}>
                        <IconBrandInstagram style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </div>
        </div>
    );
};


export default Footer;
