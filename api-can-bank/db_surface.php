<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_surface` (`id`, `name`, `color`, `code`)
VALUES (1, "glossy", "lightgray", "")';
$query[2] = 'INSERT IGNORE INTO `can_surface` (`id`, `name`, `color`, `code`)
VALUES (2, "matt", "silver", "")';
$query[3] = 'INSERT IGNORE INTO `can_surface` (`id`, `name`, `color`, `code`)
VALUES (3, "foil", "yellow", "")';
$query[4] = 'INSERT IGNORE INTO `can_surface` (`id`, `name`, `color`, `code`)
VALUES (4, "paper", "white", "")';

$mysqli = my_connect();

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_surface: ' . $mysqli->error);
  }
}

json_success($mysqli);
