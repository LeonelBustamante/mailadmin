import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, message, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Buscador } from '../../components/Buscador/Buscador';
import { useDatosCrud } from '../../hooks/useDatosCrud';
import type { IDatoCrud } from '../../types';
import { ModalAlta } from './ModalAlta';
import ModalEditar from './ModalEditar';

const ABM: React.FC = () => {
    const { datos, obtenerDatos, eliminarDato, cargando, error } = useDatosCrud();
    const [datosFiltrados, setDatosFiltrados] = useState<IDatoCrud[]>([]);
    const [valorBusqueda, setValorBusqueda] = useState<string>('');
    const [modalAltaVisible, setModalAltaVisible] = useState<boolean>(false);
    const [modalEditarVisible, setModalEditarVisible] = useState<boolean>(false);
    const [datoSeleccionado, setDatoSeleccionado] = useState<IDatoCrud | null>(null);
    const [eliminando, setEliminando] = useState<boolean>(false);

    useEffect(() => {
        obtenerDatos();
    }, []);

    useEffect(() => {
        if (datos.length > 0) {
            filtrarDatos(valorBusqueda);
        } else {
            setDatosFiltrados([]);
        }
    }, [datos, valorBusqueda]);

    const filtrarDatos = (valor: string) => {
        setValorBusqueda(valor);

        if (!valor) {
            setDatosFiltrados(datos);
            return;
        }

        const valorLowerCase = valor.toLowerCase();
        const resultadosFiltrados = datos.filter(
            (dato) =>
                dato.nombre.toLowerCase().includes(valorLowerCase) ||
                dato.apellido.toLowerCase().includes(valorLowerCase) ||
                dato.email.toLowerCase().includes(valorLowerCase)
        );

        setDatosFiltrados(resultadosFiltrados);
    };

    const abrirModalAlta = () => {
        setModalAltaVisible(true);
    };

    const exportarDatos = () => {
        const datosExportados = datos.map((dato) => ({
            Nombre: dato.nombre,
            Apellido: dato.apellido,
            Email: dato.email,
        }));
        const encabezados = Object.keys(datosExportados[0]).join(',');
        const filas = datosExportados.map((dato) => Object.values(dato).join(',')).join('\n');

        // ⚡ Agregar BOM al contenido para que se lean bien las tildes y caracteres especiales
        const contenidoCSV = `\uFEFF${encabezados}\n${filas}`;

        const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const fechaActual = new Date();
        const formatoFecha = `${fechaActual.getDate().toString().padStart(2, '0')}${(
            fechaActual.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}${fechaActual.getFullYear()}${fechaActual
            .getHours()
            .toString()
            .padStart(2, '0')}${fechaActual.getMinutes().toString().padStart(2, '0')}${fechaActual
            .getSeconds()
            .toString()
            .padStart(2, '0')}`;
        const a = document.createElement('a');
        a.href = url;
        a.download = `datos-${formatoFecha}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const cerrarModalAlta = () => {
        setModalAltaVisible(false);
    };

    const abrirModalEditar = (dato: IDatoCrud) => {
        setDatoSeleccionado(dato);
        setModalEditarVisible(true);
    };

    const cerrarModalEditar = () => {
        setModalEditarVisible(false);
        setDatoSeleccionado(null);
    };

    const confirmarEliminar = async (id: number) => {
        try {
            setEliminando(true);
            await eliminarDato(id);
            message.success('Usuario eliminado correctamente');
        } catch (error) {
            message.error('Error al eliminar el usuario');
        } finally {
            setEliminando(false);
        }
    };

    const columnas = [
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Apellido', dataIndex: 'apellido', key: 'apellido' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Acciones',
            key: 'acciones',
            width: 150,
            render: (_: any, registro: IDatoCrud) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => abrirModalEditar(registro)}
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title="Eliminar usuario"
                        description="¿Está seguro de eliminar este usuario?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => confirmarEliminar(registro.id)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} loading={eliminando}>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Administración de Usuarios"
            extra={
                <Space>
                    <Buscador valorActual={valorBusqueda} alBuscar={filtrarDatos} />
                    <Button type="primary" icon={<PlusOutlined />} onClick={abrirModalAlta}>
                        Nuevo Usuario
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DownloadOutlined />}
                        onClick={exportarDatos}
                    >
                        Exportar
                    </Button>
                </Space>
            }
        >
            <Table
                dataSource={datosFiltrados}
                columns={columnas}
                rowKey="id"
                loading={cargando}
                locale={{
                    emptyText: error ? `Error: ${error}` : 'No hay datos disponibles',
                }}
                pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
                    defaultPageSize: 10,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
            />

            <ModalAlta
                visible={modalAltaVisible}
                onClose={cerrarModalAlta}
                onSuccess={() => {
                    cerrarModalAlta();
                    obtenerDatos();
                }}
            />

            {datoSeleccionado && (
                <ModalEditar
                    visible={modalEditarVisible}
                    dato={datoSeleccionado}
                    onClose={cerrarModalEditar}
                    onSuccess={() => {
                        cerrarModalEditar();
                        obtenerDatos();
                    }}
                />
            )}
        </Card>
    );
};

export default ABM;
