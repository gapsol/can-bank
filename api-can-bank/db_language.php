<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (1, "slovak", "sk", 1)';
$query[2] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (2, "czech", "cz", 0)';
$query[3] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (3, "polish", "pl", 0)';
$query[4] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (4, "hungarian", "hu", 0)';
$query[5] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (5, "german", "de", 0)';
$query[6] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (6, "french", "fr", 0)';
$query[7] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (7, "spanish", "es", 0)';
$query[8] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (8, "catalan", "ca", 0)';
$query[9] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (9, "english", "en", 0)';
$query[10] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (10, "russian", "ru", 0)';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->error) {
  array_push($j, 'can_language: ' . $mysqli->error);
}
$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  array_push($j, 'can_language: ' . $mysqli->error);
}

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_language: ' . $mysqli->error);
  }
}
$mysqli->close();

// if (count($j) > 0) { json_error($mysqli, 500, $j); }
