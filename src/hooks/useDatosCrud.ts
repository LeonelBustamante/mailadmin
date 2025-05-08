import { useState } from 'react';
import { obtenerDatosCrud } from '../services';
import type { IDatoCrud } from '../types';

export const useDatosCrud = () => {
    const [datos, setDatos] = useState<IDatoCrud[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const obtenerDatos = async () => {
        setCargando(true);
        setError(null);

        try {
            const respuesta = await obtenerDatosCrud();
            setDatos(respuesta);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setError('Error al obtener los datos');
        } finally {
            setCargando(false);
        }
    };

    const crearDato = async (nuevoDato: Omit<IDatoCrud, 'id'>) => {
        setCargando(true);
        setError(null);

        return new Promise<IDatoCrud>((resolve, reject) => {
            // Simulamos una llamada a la API para crear un dato
            setTimeout(() => {
                try {
                    const nuevoId = Math.max(...datos.map((d) => d.id), 0) + 1;
                    const datoCreado = { ...nuevoDato, id: nuevoId };

                    setDatos((prevDatos) => [...prevDatos, datoCreado]);
                    setCargando(false);
                    resolve(datoCreado);
                } catch (error) {
                    setCargando(false);
                    setError('Error al crear el dato');
                    reject(error);
                }
            }, 500);
        });
    };

    const editarDato = async (id: number, datosActualizados: Partial<IDatoCrud>) => {
        setCargando(true);
        setError(null);

        return new Promise<IDatoCrud>((resolve, reject) => {
            // Simulamos una llamada a la API para editar un dato
            setTimeout(() => {
                try {
                    const datoIndex = datos.findIndex((d) => d.id === id);

                    if (datoIndex === -1) {
                        throw new Error('Dato no encontrado');
                    }

                    const datosActuales = [...datos];
                    const datoActualizado = {
                        ...datosActuales[datoIndex],
                        ...datosActualizados,
                    };

                    datosActuales[datoIndex] = datoActualizado;
                    setDatos(datosActuales);
                    setCargando(false);
                    resolve(datoActualizado);
                } catch (error) {
                    setCargando(false);
                    setError('Error al editar el dato');
                    reject(error);
                }
            }, 500);
        });
    };

    const eliminarDato = async (id: number) => {
        setCargando(true);
        setError(null);

        return new Promise<void>((resolve, reject) => {
            // Simulamos una llamada a la API para eliminar un dato
            setTimeout(() => {
                try {
                    const datosActualizados = datos.filter((d) => d.id !== id);
                    setDatos(datosActualizados);
                    setCargando(false);
                    resolve();
                } catch (error) {
                    setCargando(false);
                    setError('Error al eliminar el dato');
                    reject(error);
                }
            }, 500);
        });
    };

    return {
        datos,
        obtenerDatos,
        crearDato,
        editarDato,
        eliminarDato,
        cargando,
        error,
    };
};
