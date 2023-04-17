<?php

// v. 1.001

function getImportantData($object) {
    $newObject['supporter_name'] = $object -> supporter_name;
    $newObject['support_coffees'] = $object -> support_coffees;
    $newObject['support_note'] = $object -> support_note;
    $newObject['support_on'] = $object -> support_updated_on;
    return $newObject;
}

function URLarray ($url = NULL) {
    if ($url===NULL) {$url = $_SERVER['REQUEST_URI']; }
    return explode("/", parse_url($url, PHP_URL_PATH));
}

function fullURL () {
    return "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}