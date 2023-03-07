<?php

    function getImportantData($object) {
        $newObject['supporter_name'] = $object -> supporter_name;
        $newObject['support_coffees'] = $object -> support_coffees;
        $newObject['support_note'] = $object -> support_note;
        $newObject['support_on'] = $object -> support_updated_on;
        return $newObject;
    }

    header("Content-type: application/json; charset=UTF-8");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
    header("Access-Control-Allow-Headers: Content-Type");

    require('token.php');
    if (!isset($_GET['page'])) {
        $url = 'https://developers.buymeacoffee.com/api/v1/supporters';
    } else {
        $url = 'https://developers.buymeacoffee.com/api/v1/supporters?page='.$_GET['page'];
    }
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
    $context = stream_context_create($options);
    $resultFromAPI = json_decode(file_get_contents($url, false, $context));
    if(!isset($resultFromAPI->error)) {
        $result['current_page'] = $resultFromAPI->current_page;
        $result['supporters'] = array_map('getImportantData', $resultFromAPI->data);
        $result['first_page']['url'] = $resultFromAPI->first_page_url;
        $result['first_page']['id'] = explode('?page=', $result['first_page']['url'])[1];

        $result['last_page']['url'] = $resultFromAPI->last_page_url;
        $result['last_page']['id'] = explode('?page=', $result['last_page']['url'])[1];

        $result['next_page']['url'] = $resultFromAPI->next_page_url;
        if($result['next_page']['url'] != null) {
            $result['next_page']['id'] = explode('?page=', $result['next_page']['url'])[1];
        } else {
            $result['next_page']['id'] = $result['next_page']['url'];
        }
        $result['prev_page']['url'] = $resultFromAPI->prev_page_url;
        if($result['prev_page']['url'] != null) {
            $result['prev_page']['id'] = explode('?page=', $result['prev_page']['url'])[1];
        } else {
            $result['prev_page']['id'] = $result['prev_page']['url'];
        }
        $result['total_pages'] = $result['last_page']['id'];
        $result['total_supporters'] = $resultFromAPI->total;
    } else {
        $$result['error'] = $resultFromAPI->error;
    }

    echo json_encode($result);

?>
