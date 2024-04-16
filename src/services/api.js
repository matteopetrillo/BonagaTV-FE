const baseURL = 'http://localhost:8080/api'; // Assicurati di sostituire con il tuo URL API

export const getCanali = () => {
  return fetch(`${baseURL}/canale/raccolta`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante il recupero dei canali');
      }
      return response.json();
    })
    .catch(error => {
      throw new Error('Errore di rete durante la richiesta');
    });
};

export const getInfoCanale = (id) => {
  return fetch(`${baseURL}/canale/getInfo/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante il recupero delle informazioni');
      }
      return response.json();
    })
    .catch(error => {
      throw new Error('Errore di rete durante la richiesta');
    });
};