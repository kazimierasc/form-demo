<?php
error_reporting(-1);
ini_set('display_errors', 'On');
require '../../lib/constants.php';
require '../../lib/database.php';
require '../../lib/accommodation.php';

$accommodation = new formDemo\Accommodation();

if ($accommodation->validate($_POST)) {
    $result = $accommodation->insert($_POST);
    if ($result) {
        header('content-type:application/json');
        echo json_encode($result);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(400);
}
