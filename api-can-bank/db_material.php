<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_material` (`id`, `name`, `abbr`, `color`, `code`)
VALUES (1, "Aluminium", "Al", "silver", "")';
$query[2] = 'INSERT IGNORE INTO `can_material` (`id`, `name`, `abbr`, `color`, `code`)
VALUES (2, "Steel", "Fe", "gray", "")';

$mysqli = my_connect();

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_material: ' . $mysqli->error);
  }
}

json_success($mysqli);
