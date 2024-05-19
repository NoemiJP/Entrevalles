export function url() {
    // Determinar la URL base en función del entorno
    let baseUrl;
    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://entrevallesbackend.onrender.com';
    } else {
      baseUrl = 'http://localhost:8081'; // URL base para desarrollo
    }
  
   return baseUrl;
  }