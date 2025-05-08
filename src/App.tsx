import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { message } from 'antd';
import { ABM, FormularioLogin, LayoutPrincipal, RutaPrivada } from './components';
import { useUsuario } from './hooks';
import { RUTAS } from './utils';
import { ThemeProvider } from './context';

export const App: React.FC = () => {
    const { usuario, iniciarSesion, cerrarSesion } = useUsuario();
    const [messageApi, contextHolder] = message.useMessage();

    // Manejar intentos de inicio de sesión
    const handleLogin = async (usuarioData: any) => {
        try {
            if (usuarioData) {
                await iniciarSesion(usuarioData.email, usuarioData.password);
                messageApi.success('Inicio de sesión exitoso');
            }
        } catch (error) {
            messageApi.error('Error al iniciar sesión');
        }
    };

    return (
        <ThemeProvider>
            <BrowserRouter>
                {contextHolder}
                <LayoutPrincipal usuarioNombre={usuario?.nombre} onCerrarSesion={cerrarSesion}>
                    <Routes>
                        <Route
                            path={RUTAS.login}
                            element={
                                usuario ? (
                                    <Navigate to={RUTAS.home} replace />
                                ) : (
                                    <FormularioLogin onLogin={handleLogin} />
                                )
                            }
                        />
                        <Route
                            path={RUTAS.home}
                            element={
                                <RutaPrivada isAutenticado={!!usuario}>
                                    <ABM />
                                </RutaPrivada>
                            }
                        />
                        <Route path="*" element={<Navigate to={RUTAS.login} replace />} />
                    </Routes>
                </LayoutPrincipal>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
