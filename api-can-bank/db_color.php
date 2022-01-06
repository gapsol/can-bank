<?php

if ($_SERVER['REQUEST_URI'] == '/favicon.ico') return false;
require_once 'get_headers.php';
require_once 'json_responses.php';
require_once 'get_config.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (1, "metal - silver", "silver", 1)';
$query[2] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (2, "metal - yellow", "gold", 0)';
$query[3] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (3, "blue", "blue", 0)';
$query[4] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (4, "red", "red", 0)';
$query[5] = 'INSERT IGNORE INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (5, "yellow", "yellow", 0)';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->connect_error) {
  array_push($j, 'can_color: ' . $mysqli->connect_error);
}
$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  array_push($j, 'can_color: ' . $mysqli->error);
}

for ($i = 1; $i <= count($query); $i++) {
  $result = $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_color: ' . $mysqli->error);
  }
}
$mysqli->close();

// if (count($j) > 0) { json_error($mysqli, 500, $j); }
