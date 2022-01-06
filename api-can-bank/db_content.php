<?php

require_once 'get_headers.php';
require_once 'json_responses.php';
require_once 'get_config.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (1, "beer", 1)';
$query[2] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (2, "radler", 0)';
$query[3] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (3, "cider", 0)';
$query[4] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (4, "lemonade", 0)';
$query[5] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (5, "energy drink", 0)';
$query[6] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (6, "water", 0)';
$query[7] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (7, "coffee", 0)';
$query[8] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (8, "wine", 0)';
$query[9] = 'INSERT IGNORE INTO `can_content` (`id`, `name`, `default`) VALUES (9, "mix", 0)';

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
