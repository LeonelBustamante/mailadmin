import React from 'react';
import { Input } from 'antd';

interface BuscadorProps {
    valorActual: string;
    alBuscar: (valor: string) => void;
}

export const Buscador: React.FC<BuscadorProps> = ({ valorActual, alBuscar }) => (
    <Input.Search
        placeholder="Buscar por nombre o apellido"
        allowClear
        enterButton
        value={valorActual}
        onChange={(e) => alBuscar(e.target.value)}
        onSearch={alBuscar}
        style={{ width: 300 }}
    />
);
