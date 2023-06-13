<?php

// v. 1.001

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
header("Access-Control-Allow-Headers: Content-Type");

require('token.php');
require('lib.php');

$urlArray = URLarray();
$arrIndex = array_search("buymeacoffee", $urlArray);
$requestType = $urlArray[$arrIndex+1];

$header = array(
    'Authorization: Bearer ' . $api_key,
    'Content-Type: application/json'
);

$options = array(
    'http' => array(
        'header' => implode("\r\n", $header),
        'ignore_errors' => true
    )
);

if ($requestType == 'supporters') {
    $url = 'https://developers.buymeacoffee.com/api/v1/supporters';
    $context = stream_context_create($options);
    $resultFromAPI = json_decode(file_get_contents($url, false, $context));
    if(!isset($resultFromAPI->error)) {
        $result['supporters'] = array_map('getImportantData', $resultFromAPI->data);
        $result['total_supporters'] = $resultFromAPI->total;
    } else {
        $$result['error'] = $resultFromAPI->error;
    }

    echo json_encode($result);
}


?>
