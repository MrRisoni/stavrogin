<?php



$data = array(
    'foreignText' => 'winter',
    'translationText' => 'σχολείο',
    'pronounceText' => 'schkóla',
    'foreignLang' => 'русский',
    'transLang' => 'Ελληνικά',
    'posText' => 'Noun'
);

$payload = json_encode($data);

// Prepare new cURL resource
$ch = curl_init('http://localhost:3500/api/new/word');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLINFO_HEADER_OUT, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

// Set HTTP Header for POST request
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload))
);

// Submit the POST request
$result = curl_exec($ch);

// Close cURL session handle
curl_close($ch);
