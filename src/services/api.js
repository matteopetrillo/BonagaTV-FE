export const baseURL = process.env.VUE_APP_ROOT_API

export const getCanali = () => {
  return fetch(`${baseURL}/canale/raccolta`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante il recupero dei canali');
      }
      return response.json();
    })
    .catch(error => {
      console.log(error)
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
      console.log(error)
      throw new Error('Errore di rete durante la richiesta');
    });
};

export const getSpecialEventChannel = (credentials) => {
  return fetch(`${baseURL}/canale/getSpecial`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante il recupero delle informazioni');
      }
      return response.json();
    })
    .catch(error => {
      console.log(error)
      throw new Error('Errore di rete durante la richiesta');
    });
};

export const attivaUtente = (id) => {
  return fetch(`${baseURL}/utente/attiva?id=${id}`, {
    method: 'POST',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore in attivaUtente');
      }
      return response
    })
    .catch(error => {
      console.log(error)
      throw new Error('Errore in attivaUtente');
    });
};

export const disattivaUtente = (id) => {
  return fetch(`${baseURL}/utente/disattiva?id=${id}`, {
    method: 'POST',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore in disattivaUtente');
      }
      return response
    })
    .catch(error => {
      console.log(error)
      throw new Error('Errore in disattivaUtente');
    });
};

export const login = (email, password) => {

  const data = {
    email: email,
    password: password
  };

  return fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error)
    });
};

export const registraUtente = (email, idEvento) => {

  const data = {
    email: email,
    idEvento: idEvento
  };

  return fetch(`${baseURL}/utente/registra`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante la registrazione utente');
      }
      return response.json()
    })
    .catch(error => {
      console.log(error)
    });
};

export const registraOrdine = (data) => {

  return fetch(`${baseURL}/ordine/registra-ordine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante la registrazione dell ordine');
      }
    })
    .catch(error => {
      console.log(error)
    });
};

export const checkDispEmail = (email) => {

  return fetch(`${baseURL}/utente/check-by-email?email=${email}`, {
    method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante il check della disp email');
      }
      return response.json();
    })
    .catch(error => {
      console.log(error)
    });
};

export const sendEmail = (idUtente) => {

  return fetch(`${baseURL}/utente/send-email?id=${idUtente}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {}
    })
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(error)
    });
};