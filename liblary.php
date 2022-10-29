<?php
    function getDataFromDB($sql, $db_data) {
        $connection = mysqli_connect($db_data['db_host'], $db_data['db_user'], $db_data['db_pass'], $db_data['db_name']);
        $query_result = mysqli_query($connection, $sql)->fetch_assoc();
        mysqli_close($connection);
        return  $query_result;
    }

    function updateDataInDB($sql, $db_data) {
        $connection = mysqli_connect($db_data['db_host'], $db_data['db_user'], $db_data['db_pass'], $db_data['db_name']);
        mysqli_query($connection, $sql);
        mysqli_close($connection);
    }
?>