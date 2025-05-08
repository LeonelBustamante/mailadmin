import type { IUsuario } from '../types';

const usuarioMock: IUsuario = {
    id: 1,
    nombre: 'Admin',
    apellido: 'Sistema',
    email: 'admin@ejemplo.com',
};

export const autenticarUsuario = (email: string, password: string): Promise<IUsuario> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@ejemplo.com' && password === 'admin123') {
                resolve(usuarioMock);
            } else {
                reject(new Error('Credenciales inválidas'));
            }
        }, 500);
    });
};

export const cerrarSesionServicio = (): void => {
    // Aquí podrías limpiar tokens en localStorage, etc.
};
