import es_ES from 'antd/lib/locale/es_ES';
import { ConfigProvider, theme } from 'antd';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    tema: ThemeType;
    cambiarTema: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Verificar si hay un tema guardado en localStorage
    const [tema, setTema] = useState<ThemeType>(() => {
        const temaGuardado = localStorage.getItem('tema');
        return (temaGuardado as ThemeType) || 'light';
    });

    // Cambiar entre temas
    const cambiarTema = () => {
        const nuevoTema = tema === 'light' ? 'dark' : 'light';
        setTema(nuevoTema);
        localStorage.setItem('tema', nuevoTema);
    };

    // Aplicar el tema al documento
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', tema);

        // Añadir clase al body para estilos globales
        if (tema === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [tema]);

    // Configurar el algoritmo de tema de Ant Design
    const { defaultAlgorithm, darkAlgorithm } = theme;

    return (
        <ThemeContext.Provider value={{ tema, cambiarTema }}>
            <ConfigProvider
                locale={es_ES}
                theme={{
                    algorithm: tema === 'dark' ? darkAlgorithm : defaultAlgorithm,
                    token: {
                        colorPrimary: '#1890ff',
                    },
                    components: {
                        Table: {
                            colorBgContainer: tema === 'dark' ? '#141414' : '#ffffff',
                            colorText: tema === 'dark' ? '#e6e6e6' : '#000000',
                        },
                        Card: {
                            colorBgContainer: tema === 'dark' ? '#1f1f1f' : '#ffffff',
                        },
                        Modal: {
                            colorBgElevated: tema === 'dark' ? '#1f1f1f' : '#ffffff',
                        },
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

// Hook personalizado para usar el contexto del tema
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
    }
    return context;
};
