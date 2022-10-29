<?php
    function getDataFromDB($sql, $db_data) {
        $connection = new mysqli($db_data['db_host'], $db_data['db_user'], $db_data['db_pass'], $db_data['db_name']);
        $query_result = $connection->query($sql);
        $final_result = $query_result->fetch_assoc();
        $connection->close();
        return json_encode($final_result);
    }

    function updateDataInDB($sql, $db_data) {
        $connection = new mysqli($db_data['db_host'], $db_data['db_user'], $db_data['db_pass'], $db_data['db_name']);
        $connection->query($sql);
        $connection->close();
    }
?>