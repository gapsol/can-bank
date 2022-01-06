<?php

require_once 'get_headers.php';
require_once 'json_responses.php';
require_once 'get_config.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_material` (`id`, `name`, `abbr`, `color`, `default`) VALUES (1, "Aluminium", "Al", "silver", 1)';
$query[2] = 'INSERT IGNORE INTO `can_material` (`id`, `name`, `abbr`, `color`, `default`) VALUES (2, "Steel", "Fe", "gray", 0)';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->error) {
  array_push($j, 'can_material: ' . $mysqli->error);
}
$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  array_push($j, 'can_material: ' . $mysqli->error);
}

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_material: ' . $mysqli->error);
  }
}
$mysqli->close();

// if (count($j) > 0) { json_error($mysqli, 500, $j); }
