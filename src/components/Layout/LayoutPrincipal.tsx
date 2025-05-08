import React from 'react';
import { Button, Image, Layout, Space, Typography, Tooltip, Flex } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import { useTheme } from '../../context';

const { Text } = Typography;

interface LayoutProps {
    usuarioNombre?: string;
    onCerrarSesion: () => void;
    children: ReactNode;
}

export const LayoutPrincipal: React.FC<LayoutProps> = ({
    usuarioNombre,
    onCerrarSesion,
    children,
}) => {
    const { tema, cambiarTema } = useTheme();

    return (
        <Layout style={{ minHeight: '100vh', width: '100vw' }}>
            <Layout.Header
                style={{
                    background: tema === 'dark' ? '#001529' : '#fff',
                    color: tema === 'dark' ? '#fff' : '#000',
                }}
            >
                <Flex justify="space-between" align="center">
                    <Image
                        src={tema === 'dark' ? '/logo-blanco.svg' : '/logo-rojo.svg'}
                        preview={false}
                        alt="Logo"
                        width={120}
                    />
                    <Space>
                        <Tooltip
                            title={
                                tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
                            }
                        >
                            <Button
                                shape="circle"
                                icon={tema === 'dark' ? <SunOutlined /> : <MoonOutlined />}
                                onClick={cambiarTema}
                            />
                        </Tooltip>
                        {usuarioNombre && (
                            <Text style={{ color: tema === 'dark' ? '#fff' : '#000' }}>
                                Bienvenido, {usuarioNombre}
                            </Text>
                        )}
                        {usuarioNombre && <Button onClick={onCerrarSesion}>Cerrar sesión</Button>}
                    </Space>
                </Flex>
            </Layout.Header>
            <Layout.Content style={{ padding: '24px' }}>{children}</Layout.Content>
        </Layout>
    );
};
