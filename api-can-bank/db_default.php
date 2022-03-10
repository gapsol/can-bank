<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT INTO `can_default` (`table`, `key`) VALUES
("color", 1),
("content", 1),
("country", 1),
("language", 1),
("material", 1),
("surface", 1),
("type", 1);';

$mysqli = my_connect();
for ($i = 1; $i <= count($query); $i++) {
  $result = my_query($mysqli, $query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_default: ' . $mysqli->error);
  }
}

json_success($mysqli);
