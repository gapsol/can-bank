<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`, `default`)
VALUES (1, "metal - silver", "silver", "", 1)';
$query[2] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`, `default`)
VALUES (2, "metal - yellow", "gold", "", 0)';
$query[3] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`, `default`)
VALUES (3, "blue", "blue", "", 0)';
$query[4] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`, `default`)
VALUES (4, "red", "red", "", 0)';
$query[5] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `code`, `default`)
VALUES (5, "yellow", "yellow", "", 0)';

$mysqli = my_connect();
for ($i = 1; $i <= count($query); $i++) {
  $result = my_query($mysqli, $query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_color: ' . $mysqli->error);
  }
}

json_success($mysqli);
