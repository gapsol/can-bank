<?php

$json = file_get_contents("../_settings/_env_php.json");
$params = json_decode($json, true);

define('DB_SERVER', $params['db_server']);
define('DB_USERNAME', $params['db_username']);
define('DB_PASSWORD', $params['db_password']);
define('DB_NAME', $params['db_name']);
define('DB_CHARSET', $params['db_charset']);
define('DB_COLLATION', $params['db_collation']);

// empty($var) = !isset($var) || $var == false
// false: $var EXISTS, NON-EMPTY, NON-ZERO

function isfull($var)
{
  return $var !== NULL && $var !== '';
}

function gen_uniq()
{
  return time() . rand(100, 999);
}
