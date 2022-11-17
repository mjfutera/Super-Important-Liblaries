<?php
    function connectDB($sql, $db_data) {
        $connection = mysqli_connect($db_data['db_host'], $db_data['db_user'], $db_data['db_pass'], $db_data['db_name']);
        $query_result = mysqli_query($connection, $sql);
        mysqli_close($connection);
        return $query_result;
    }

    function dbToArray($query_result) {
        $array = array();
        while($row = mysqli_fetch_array($query_result, MYSQLI_ASSOC))
        {
            array_push($array, $row);
        }
        return $array;
    }

    function generateKey() { //For  API
        return implode('-', str_split(substr(strtolower(md5(microtime().rand(1000, 9999))), 0, 30), 6));
    }

    function emailValidator($email) {
        $regex = '/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i';
        return preg_match($regex, $email);
    }

    $passRegEx['length'] = 7;
    $passRegEx['capitalLetters'] = "/[A-Z]/";
    $passRegEx['smallLetters'] = "/[a-z]/";
    $passRegEx['numbers'] = "/\d/";
    $passRegEx['specialDigits'] = "/[!@#$%^&*()]/";
    $passRegEx['noSpaces'] = "/[ ]/";

    function loginValidator($login) {
        $length = (strlen($pass) > $passRegEx['length']);
        $capitalLetters = $passRegEx['capitalLetters'].test($password);
        $smallLetters = $passRegEx['smallLetters'].test($password);
        $numbers = $passRegEx['numbers'].test($password);
        $specialDigits = $passRegEx['specialDigits'].test($password);
        $noSpaces = !$passRegEx['noSpaces'].test($password);
        return ($length && $capitalLetters && $smallLetters && $numbers && $specialDigits && $noSpaces);
    }

    function loginLengthValidator($login) {
        return (strlen($login) > $passRegEx['length']);
    }

    function generatePassword() {
        $alphabet = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 15; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    function secureInput($input) {
        return htmlentities($input, ENT_QUOTES, "UTF-8");
    }
?>