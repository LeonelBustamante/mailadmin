import { useState } from 'react';
import { autenticarUsuario, cerrarSesionServicio } from '../services';
import type { IUsuario } from '../types';

export const useUsuario = () => {
    const [usuario, setUsuario] = useState<IUsuario | null>(null);

    const iniciarSesion = async (email: string, password: string) => {
        const datos = await autenticarUsuario(email, password);
        setUsuario(datos);
    };

    const cerrarSesion = () => {
        cerrarSesionServicio();
        setUsuario(null);
    };

    return { usuario, iniciarSesion, cerrarSesion };
};
