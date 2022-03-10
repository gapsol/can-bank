<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`)
VALUES (1, "metal - silver", "silver", "")';
$query[2] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`)
VALUES (2, "metal - yellow", "gold", "")';
$query[3] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`)
VALUES (3, "blue", "blue", "")';
$query[4] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`)
VALUES (4, "red", "red", "", 0)';
$query[5] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`)
VALUES (5, "yellow", "yellow", "")';

$mysqli = my_connect();
for ($i = 1; $i <= count($query); $i++) {
  $result = my_query($mysqli, $query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_color: ' . $mysqli->error);
  }
}

json_success($mysqli);
