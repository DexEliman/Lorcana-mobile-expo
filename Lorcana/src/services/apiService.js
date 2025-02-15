const API_URL = 'https://lorcana.brybry.fr';

export const fetchChapters = async () => {
  try {
    const response = await fetch(`${API_URL}/chapters`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

export const fetchCardsByChapter = async (chapterId) => {
  try {
    const response = await fetch(`${API_URL}/chapters/${chapterId}/cards`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

export const fetchCardDetails = async (cardId) => {
  try {
    const response = await fetch(`${API_URL}/cards/${cardId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching card details:', error);
    throw error;
  }
};

// Additional API functions can be added here
