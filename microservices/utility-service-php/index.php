<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Obsługa różnych endpointów
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Router
switch (true) {
    case $method === 'GET' && $path === '/health':
        echo json_encode(['status' => 'OK', 'service' => 'Utility Service PHP']);
        break;
        
    case $method === 'POST' && $path === '/validate-nip':
        validateNIP();
        break;
        
    case $method === 'POST' && $path === '/generate-qr':
        generateQRCode();
        break;
        
    case $method === 'POST' && $path === '/validate-email':
        validateEmail();
        break;
        
    case $method === 'POST' && $path === '/format-currency':
        formatCurrency();
        break;
        
    case $method === 'GET' && $path === '/exchange-rates':
        getExchangeRates();
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

function validateNIP() {
    $input = json_decode(file_get_contents('php://input'), true);
    $nip = $input['nip'] ?? '';
    
    // Usuń wszystkie znaki niebędące cyframi
    $nip = preg_replace('/[^0-9]/', '', $nip);
    
    if (strlen($nip) !== 10) {
        echo json_encode(['valid' => false, 'message' => 'NIP musi mieć 10 cyfr']);
        return;
    }
    
    // Walidacja sumy kontrolnej NIP
    $weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    $sum = 0;
    
    for ($i = 0; $i < 9; $i++) {
        $sum += $nip[$i] * $weights[$i];
    }
    
    $controlDigit = $sum % 11;
    if ($controlDigit === 10) {
        $controlDigit = 0;
    }
    
    $valid = $controlDigit == $nip[9];
    
    echo json_encode([
        'valid' => $valid,
        'nip' => $nip,
        'message' => $valid ? 'NIP jest prawidłowy' : 'Nieprawidłowy NIP'
    ]);
}

function generateQRCode() {
    $input = json_decode(file_get_contents('php://input'), true);
    $data = $input['data'] ?? '';
    
    if (empty($data)) {
        echo json_encode(['error' => 'Brak danych do wygenerowania QR']);
        return;
    }
    
    // Prosty URL do generowania QR (można zastąpić lokalnym generatorem)
    $qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' . urlencode($data);
    
    echo json_encode([
        'qr_url' => $qrUrl,
        'data' => $data
    ]);
}

function validateEmail() {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    
    $valid = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    
    echo json_encode([
        'valid' => $valid,
        'email' => $email,
        'message' => $valid ? 'Email jest prawidłowy' : 'Nieprawidłowy format email'
    ]);
}

function formatCurrency() {
    $input = json_decode(file_get_contents('php://input'), true);
    $amount = $input['amount'] ?? 0;
    $currency = $input['currency'] ?? 'PLN';
    $locale = $input['locale'] ?? 'pl_PL';
    
    $formatted = number_format($amount, 2, ',', ' ') . ' ' . $currency;
    
    echo json_encode([
        'formatted' => $formatted,
        'amount' => $amount,
        'currency' => $currency
    ]);
}

function getExchangeRates() {
    // Symulacja kursów walut (w prawdziwej aplikacji pobierz z NBP API)
    $rates = [
        'EUR' => 4.32,
        'USD' => 4.05,
        'GBP' => 5.15,
        'CHF' => 4.48,
        'CZK' => 0.17
    ];
    
    echo json_encode([
        'base' => 'PLN',
        'rates' => $rates,
        'last_updated' => date('Y-m-d H:i:s')
    ]);
}
?> 