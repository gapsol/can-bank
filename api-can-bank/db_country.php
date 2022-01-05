<?php

require_once 'get_headers.php';
require_once 'json_responses.php';
require_once 'get_config.php';

if (!isset($j)) { $j = []; }
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (1, "Slovakia", "SK", 1)';
$query[2] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (2, "Czechia", "CZ", 0)';
$query[3] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (3, "Poland", "PL", 0)';
$query[4] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (4, "Hungary", "HU", 0)';
$query[5] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (5, "Germany", "DE", 0)';
$query[6] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (6, "Austria", "AT", 0)';
$query[7] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (7, "France", "FR", 0)';
$query[8] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (8, "Spain", "ES", 0)';
$query[9] = 'INSERT IGNORE INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (9, "Ukraine", "UA", 0)';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
  if ($mysqli->error)  { array_push($j, 'can_country: '.$mysqli->error); }
$mysqli->select_db(DB_NAME);
  if ($mysqli->error)  { array_push($j, 'can_country: '.$mysqli->error); }

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
    if ($mysqli->error)  { array_push($j, 'can_country: '.$mysqli->error); }
  }
$mysqli->close();

// if (count($j) > 0) { json_error($mysqli, 500, $j); }
