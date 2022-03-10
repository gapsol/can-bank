<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

if (!isset($j)) {
  $j = [];
}
$query = [];
$query[1] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (1, "2: Svijany (can-for-men)", 0, 0, 2000, 0)';
$query[2] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (2, "1: cylinder (october-fest)", 0, 0, 1000, 0)';
$query[3] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (3, "1: classic (russian-beer-type)", 0, 0, 1000, 0)';
$query[4] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (4, "0.710/24: classic (us-big-beer)", 0, 0, 710, 24)';
$query[5] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (5, "0.7: fat-boy (beer-type)", 0, 0, 700, 0)';
$query[6] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (6, "0.680/23: AriZona (us-big-limo)", 0, 0, 680, 23)';
$query[7] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (7, "0.568: classic (us-xxl-type)", 0, 0, 568, 0)';
$query[8] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (8, "0.550: classic (xxl-type)", 0, 0, 550, 0)';
$query[9] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (9, "0.5: classic (beer-type)", 67, 167, 500, 0, 1)';
$query[10] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (10, "0.473: classic (us-ipa-type)", 0, 0, 473, 0)';
$query[11] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (11, "0.443/15: classic (monster-type)", 0, 0, 443, 15)';
$query[12] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (12, "0.440: classic (cider-type)", 0, 0, 440, 0)';
$query[13] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (13, "0.4: classic (cider-type)", 0, 0, 400, 0)';
$query[14] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (14, "0.345: classic (chups-type)", 66, 124, 345, 0)';
$query[15] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (15, "0.355/12: classic (us-beer-type)", 69, 122, 355, 12)';
$query[16] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (16, "0.355: slim (limo-type)", 0, 0, 355, 0)';
$query[17] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (17, "0.330: classic (beer-type)", 62, 110, 330, 0)';
$query[18] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (18, "0.330: slim (limo-type)", 61, 145, 330, 0)';
$query[19] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (19, "0.280: slim (special-type)", 0, 0, 280, 0)';
$query[20] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (20, "0.250: slim (energy-type)", 51, 134, 250, 0)';
$query[21] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (21, "0.250: short (limo-type)", 0, 0, 250, 0)';
$query[22] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (22, "0.240: short (coffe-type)", 0, 0, 240, 0)';
$query[23] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (23, "0.2: slim (secco-type)", 0, 0, 200, 0)';
$query[24] = 'INSERT IGNORE INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`) VALUES (24, "0.150: slim (cola-type)", 0, 0, 150, 0)';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->error) {
  array_push($j, 'can_type: ' . $mysqli->error);
}
$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  array_push($j, 'can_type: ' . $mysqli->error);
}

for ($i = 1; $i <= count($query); $i++) {
  $mysqli->query($query[$i]);
  if ($mysqli->error) {
    array_push($j, 'can_type: ' . $mysqli->error);
  }
}
$mysqli->close();

// if (count($j) > 0) { json_error($mysqli, 500, $j); }
