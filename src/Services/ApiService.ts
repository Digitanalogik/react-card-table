export function getApiUrl(): string {
  return process.env.REACT_APP_API_URL as string;
}

export const postSelectedCard = async (card: any) => {
  try {
    const response = await fetch(getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ card }),
    });

    if (!response.ok) {
      throw new Error('Error posting selected value');
    }

    return response.json();
  } catch (error) {
    console.error('Error posting selected value:', error);
    throw error;
  }
};
