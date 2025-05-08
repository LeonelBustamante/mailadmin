import React from 'react';
import { Navigate } from 'react-router-dom';
import { RUTAS } from '../../utils/constantes';

interface RutaPrivadaProps {
    isAutenticado: boolean;
    children: React.ReactNode;
}

const RutaPrivada: React.FC<RutaPrivadaProps> = ({ isAutenticado, children }) => {
    if (!isAutenticado) {
        return <Navigate to={RUTAS.login} replace />;
    }
    return <>{children}</>;
};

export default RutaPrivada;
