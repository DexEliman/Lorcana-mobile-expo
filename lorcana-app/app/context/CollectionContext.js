import { createContext, useContext, useState } from "react";

const CollectionContext = createContext();

export  function CollectionProvider({ children }) {
  const [collection, setCollection] = useState([]);

  const fetchUserCards = async (token) => {
    try {
      const response = await fetch('https://lorcana.brybry.fr/api/me/cards', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des cartes');
      }
  
      const data = await response.json();
      console.log('Cartes de l\'utilisateur:', data);
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };
  

  const addToCollection = (card) => {
    setCollection((prevCollection) => {
      const existingCard = prevCollection.find((c) => c.id === card.id);
      if (existingCard) {
        return prevCollection.map((c) =>
          c.id === card.id ? { ...c, normal: c.normal + card.normal, shiny: c.shiny + card.shiny } : c
        );
      } else {
        return [...prevCollection, card];
      }
    });
  };

  const updateCardQuantity = (id, normal, shiny) => {
    setCollection((prevCollection) =>
      prevCollection.map((c) => (c.id === id ? { ...c, normal, shiny } : c))
    );
  };

  return (
    <CollectionContext.Provider value={{ collection, addToCollection, updateCardQuantity }}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) throw new Error("useCollection must be used within a CollectionProvider");
  return context;
}

export { CollectionContext };
export default CollectionProvider;

