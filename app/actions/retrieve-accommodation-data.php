<?php
error_reporting(-1);
ini_set('display_errors', 'On');
require '../../lib/constants.php';
require '../../lib/database.php';
require '../../lib/accommodation.php';

if (is_numeric($_GET['id'])) {
    $accommodation = new formDemo\Accommodation();
    $result = $accommodation->getById($_GET['id']);
    if ($result) {
        header('content-type:application/json');
        echo json_encode($result);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(400);
}
