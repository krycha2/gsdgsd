// =================================================================
// KONFIGURACJA POŁĄCZENIA Z SERWEREM (XAMPP)
// =================================================================

// 1. Główny adres Twojego komputera.
// UWAGA: Sprawdź w cmd wpisując "ipconfig".
// Nie używaj "localhost", bo to nie zadziała na telefonie!
export const BASE_URL = 'http://192.168.0.152'; 

// Składamy adres do zdjęć
// Wynik: http://192.168.0.152/uploads
export const IMAGES_URL = `${BASE_URL}/uploads`;

// 2. Lista Twoich plików PHP (tzw. Endpointy)
// Dzięki temu, jak zmienisz nazwę pliku PHP, poprawisz to tylko tutaj.
export const ENDPOINTS = {
    LOGIN: '/login.php',        // Plik do logowania
    USERS: '/users_api.php',    // Plik pobierający listę użytkowników
    PERSON: '/person_api.php',
    
    // Tu możesz dopisywać kolejne w przyszłości, np.:
    // REGISTER: '/register.php',
    // PRODUCTS: '/products.php',
    // UPLOAD: '/upload_avatar.php',
};