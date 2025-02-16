import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = async (token, cardId) => {
    try {
      const response = await fetch('https://lorcana.brybry.fr/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card_id: cardId,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout à la wishlist');
      }

      const data = await response.json();
      console.log('Carte ajoutée à la wishlist:', data.message);
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };
  const removeFromWishlist = async (token, cardId) => {
    try {
      const response = await fetch('https://lorcana.brybry.fr/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card_id: cardId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la wishlist');
      }
  
      const data = await response.json();
      console.log('Carte retirée de la wishlist:', data.message);
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };
  


  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}

export { WishlistContext };
export default WishlistProvider;