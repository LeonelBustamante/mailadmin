import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import type { IDatoCrud } from '../../types';

interface ModalAltaProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const ModalAlta: React.FC<ModalAltaProps> = ({ visible, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [cargando, setCargando] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            const valores = await form.validateFields();
            setCargando(true);

            // Simulamos una llamada a la API
            setTimeout(() => {
                setCargando(false);
                message.success('Usuario creado exitosamente');
                form.resetFields();
                onSuccess();
            }, 1000);
        } catch (error) {
            console.error('Error en validación:', error);
        }
    };

    return (
        <Modal
            title="Nuevo Usuario"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancelar" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="crear" type="primary" loading={cargando} onClick={handleSubmit}>
                    Crear
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" name="formNuevoUsuario">
                <Form.Item
                    name="nombre"
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
                >
                    <Input placeholder="Ingrese el nombre" />
                </Form.Item>

                <Form.Item
                    name="apellido"
                    label="Apellido"
                    rules={[{ required: true, message: 'Por favor ingrese el apellido' }]}
                >
                    <Input placeholder="Ingrese el apellido" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Por favor ingrese el email' },
                        { type: 'email', message: 'Ingrese un email válido' },
                    ]}
                >
                    <Input placeholder="Ingrese el email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                        { required: true, message: 'Por favor ingrese la contraseña' },
                        { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                    ]}
                >
                    <Input.Password placeholder="Ingrese la contraseña" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalAlta;
