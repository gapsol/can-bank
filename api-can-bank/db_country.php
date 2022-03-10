<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (1, "Slovakia", "SK")';
$query[2] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (2, "Czechia", "CZ")';
$query[3] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (3, "Poland", "PL")';
$query[4] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (4, "Hungary", "HU")';
$query[5] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (5, "Germany", "DE")';
$query[6] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (6, "Austria", "AT")';
$query[7] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (7, "France", "FR")';
$query[8] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (8, "Spain", "ES")';
$query[9] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`) VALUES (9, "Ukraine", "UA")';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->error) {
  array_push($j, 'can_country: ' . $mysqli->error);
}
$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  array_push($j, 'can_country: ' . $mysqli->error);
}

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_country: ' . $mysqli->error);
  }
}
$mysqli->close();

// if (count($j) > 0) { json_error($mysqli, 500, $j); }
