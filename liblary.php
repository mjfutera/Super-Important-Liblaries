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
?>