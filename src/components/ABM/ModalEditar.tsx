import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useDatosCrud } from '../../hooks/useDatosCrud';
import type { IDatoCrud } from '../../types';

interface ModalEditarProps {
    visible: boolean;
    dato: IDatoCrud;
    onClose: () => void;
    onSuccess: () => void;
}

export const ModalEditar: React.FC<ModalEditarProps> = ({ visible, dato, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [cargando, setCargando] = useState<boolean>(false);
    const { editarDato } = useDatosCrud();

    // Inicializar el formulario con los datos del registro
    useEffect(() => {
        if (visible && dato) {
            form.setFieldsValue({
                nombre: dato.nombre,
                apellido: dato.apellido,
                email: dato.email,
                // No incluimos password por seguridad
            });
        }
    }, [visible, dato, form]);

    const handleSubmit = async () => {
        try {
            const valores = await form.validateFields();
            setCargando(true);

            await editarDato(dato.id, valores);
            message.success('Usuario actualizado exitosamente');
            onSuccess();
        } catch (error) {
            console.error('Error en validación o actualización:', error);
            message.error('Error al actualizar el usuario');
        } finally {
            setCargando(false);
        }
    };

    return (
        <Modal
            title="Editar Usuario"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancelar" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="actualizar" type="primary" loading={cargando} onClick={handleSubmit}>
                    Actualizar
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" name="formEditarUsuario">
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
                    label="Contraseña (Dejar en blanco para no cambiar)"
                    rules={[{ min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }]}
                >
                    <Input.Password placeholder="Ingrese una nueva contraseña" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditar;
