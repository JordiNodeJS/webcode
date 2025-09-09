"use client";

import { useState, useEffect } from "react";

/**
 * Hook personalizado para detectar conexiones lentas
 * 
 * @returns Boolean indicando si la conexión es lenta
 */
const useSlowConnection = (): boolean => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // En entorno de servidor, retornamos false por defecto
    if (typeof window === "undefined" || !("connection" in navigator)) {
      return;
    }

    // Verificar si el navegador soporta navigator.connection
    const connection = (navigator as any).connection;
    if (!connection) {
      return;
    }

    // Verificar el tipo de conexión efectiva
    const checkConnection = () => {
      setIsSlowConnection(
        connection.effectiveType === "slow-2g" || 
        connection.effectiveType === "2g"
      );
    };

    // Verificar inicialmente
    checkConnection();

    // Escuchar cambios en la conexión
    connection.addEventListener("change", checkConnection);

    // Limpiar el listener al desmontar
    return () => {
      connection.removeEventListener("change", checkConnection);
    };
  }, []);

  return isSlowConnection;
};

export default useSlowConnection;