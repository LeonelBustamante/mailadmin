import { datosMock } from '../components/ABM/mocks';
import type { IDatoCrud } from '../types';

export const obtenerDatosCrud = (): Promise<IDatoCrud[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(datosMock);
        }, 500)
    );
