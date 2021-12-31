<?php

$json = file_get_contents("../_settings/_env_php.json");
$params = json_decode($json, true);

define('DB_SERVER', $params['db_server']);
define('DB_USERNAME', $params['db_username']);
define('DB_PASSWORD', $params['db_password']);
define('DB_NAME', $params['db_name']);

function isfull($var) { return $var !== ''; }
