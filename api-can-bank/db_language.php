<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (1, "slovak", "sk")';
$query[2] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (2, "czech", "cz")';
$query[3] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (3, "polish", "pl")';
$query[4] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (4, "hungarian", "hu")';
$query[5] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (5, "german", "de")';
$query[6] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (6, "french", "fr")';
$query[7] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (7, "spanish", "es")';
$query[8] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (8, "catalan", "ca")';
$query[9] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (9, "english", "en")';
$query[10] = 'INSERT IGNORE INTO `can_language` (`id`, `name`, `abbr`) VALUES (10, "russian", "ru")';

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
