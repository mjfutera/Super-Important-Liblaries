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

    function loginValidator($login) {
        return preg_match("/^[A-Za-z][A-Za-z0-9_!]{6,29}$/i", $login);
    }

    function emailValidator($email) {
        $regex = '/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i';
        return preg_match($regex, $email);
    }

    function passwordValidator($password) {
        $length = (strlen($password) > 7);
        $capitalLetters = preg_match("/[A-Z]/", $password);
        $smallLetters = preg_match("/[a-z]/", $password);
        $numbers = preg_match("/\d/", $password);
        $specialDigits = preg_match("/[!@#$%^&*()]/", $password);
        $noSpaces = !preg_match("/[ ]/", $password);
        return ($length && $capitalLetters && $smallLetters && $numbers && $specialDigits && $noSpaces);
    }

    function loginLengthValidator($login) {return (strlen($login) > 7);}

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

    function secureInput($input) {return htmlentities($input, ENT_QUOTES, "UTF-8");}

    function URLarray ($url = NULL) {
        if ($url===NULL) {$url = $_SERVER['REQUEST_URI']; }
        return explode("/", parse_url($url, PHP_URL_PATH));
    }

    function fullURL () {
        return "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    }

    function connectSQLite($sql, $file) {
        $pdo = new PDO('sqlite:'.$file);
        $statement = $pdo->query($sql);
        $rows = $statement -> fetchAll(PDO::FETCH_ASSOC);
        return $rows;
    }

    function polishPostCodeVerifier($postcode) {
        $reg1 = '/^\d{2}-\d{3}$/';
        $reg2 = '/^\d{5}$/';
        return (preg_match($reg1, $postcode) || preg_match($reg2, $postcode));
     }
     
     function polishPostCodeModifier($postcode) {
        if(preg_match('/^\d{5}$/', $postcode)) {
            $newpostcode = str_split($postcode);
            return $newpostcode[0].$newpostcode[1]."-".$newpostcode[2].$newpostcode[3].$newpostcode[4];
        }
        return $postcode;
     }

     function myCURL ($url, $headers=null) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        if($headers !== null) {curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);}
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response);
     }

     function createLink($e) {
        return '<li class="mfProListItem"><a href="'.$e->url.'" class="mfProLink">'.$e->title.'</a></li>';
    }
    
    function mfProMenu() {
        echo '<ul class="mfProUnOrderedList">'.implode(array_map('createLink', myCURL('https://michalfutera.pro/wp-json/menus/v1/menus/main')->items)).'</ul>';
    }