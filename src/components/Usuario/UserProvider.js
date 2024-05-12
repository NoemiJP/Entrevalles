import React, { useState, useEffect, createContext, useContext } from 'react';

// Creamos un contexto para el usuario conectado
const UserContext = createContext();

// Creamos un componente de proveedor que almacenará el usuario conectado y proporcionará funciones para establecerlo y obtenerlo
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Aquí puedes agregar lógica para obtener el usuario de tu backend o cualquier otro método de autenticación que estés utilizando
  const updateUser = (newUser) => {
    console.log(newUser);
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder al usuario conectado en cualquier componente
const useUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser debe ser usado dentro de un UserProvider');
    }
    return context;
  };

  export { useUser };