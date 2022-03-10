<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (1, "beer")';
$query[2] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (2, "radler")';
$query[3] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (3, "cider")';
$query[4] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (4, "lemonade")';
$query[5] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (5, "energy drink")';
$query[6] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (6, "water")';
$query[7] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (7, "coffee")';
$query[8] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (8, "wine")';
$query[9] = 'INSERT IGNORE INTO `can_content` (`id`, `name`) VALUES (9, "mix")';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->error) {
  array_push($j, 'can_content: ' . $mysqli->error);
}
$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  array_push($j, 'can_content: ' . $mysqli->error);
}

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_content: ' . $mysqli->error);
  }
}
$mysqli->close();

// if (count($j) > 0) { json_error($mysqli, 500, $j); }
