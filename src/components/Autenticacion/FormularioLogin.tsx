import React, { useState } from 'react';
import { Button, Form, Input, message, Card } from 'antd';
import type { IUsuario } from '../../types';

interface FormularioLoginProps {
    onLogin: (usuario: IUsuario | null) => void;
}

interface ValoresLogin {
    email: string;
    password: string;
}

const FormularioLogin: React.FC<FormularioLoginProps> = ({ onLogin }) => {
    const [cargando, setCargando] = useState<boolean>(false);
    const [messageAPI, contextHolder] = message.useMessage();

    const onFinish = (valores: ValoresLogin) => {
        setCargando(true);

        setTimeout(() => {
            setCargando(false);

            if (valores.email === 'admin@ejemplo.com' && valores.password === 'admin123') {
                onLogin({
                    id: 1,
                    nombre: 'Admin',
                    apellido: 'Sistema',
                    email: 'admin@ejemplo.com',
                    password: 'admin123',
                });
                messageAPI.success('Inicio de sesión exitoso');
            } else {
                messageAPI.error('Credenciales inválidas');
                onLogin(null);
            }
        }, 1000);
    };

    return (
        <>
            {contextHolder}
            <Card
                title="Inicio de Sesión"
                style={{ maxWidth: 400, margin: '0 auto', marginTop: '100px' }}
            >
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Por favor ingresa tu email' },
                            { type: 'email', message: 'Ingresa un email válido' },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                    >
                        <Input.Password placeholder="Contraseña" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={cargando} block>
                            Iniciar sesión
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default FormularioLogin;
