import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Création du contexte
const AuthContext = createContext(null);

// Helper function for authenticated fetch
const authFetch = async (url, options = {}) => {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) throw new Error('No authentication token found');
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser ] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null); // Ajout d'un état d'erreur

  useEffect(() => {
    const loadUser  = async () => {
      const storedUser  = await AsyncStorage.getItem("user");
      if (storedUser ) setUser (JSON.parse(storedUser ));
    };
    loadUser ();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("https://lorcana.brybry.fr/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la connexion');
      }

      const data = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("userToken", data.token);
      setUser (data);
      setToken(data.token);
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch('https://lorcana.brybry.fr/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la déconnexion');
        }

        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        setUser (null);
        setToken(null);
        console.log('Déconnexion réussie');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authFetch, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;