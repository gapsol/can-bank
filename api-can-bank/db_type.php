<?php

$query = [];
$query[1] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (1, "2: Svijany (can-for-men)", 0, 0, 2000, 0, 0)';
$query[2] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (2, "1: cylinder (october-fest)", 0, 0, 1000, 0, 0)';
$query[3] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (3, "1: klasik (russian-beer-type)", 0, 0, 1000, 0, 0)';
$query[4] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (4, "0.710/24: klasik (us-big-beer)", 0, 0, 710, 24, 0)';
$query[5] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (5, "0.7: fat-boy (beer-type)", 0, 0, 700, 0, 0)';
$query[6] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (6, "0.680/23: AriZona (us-big-limo)", 0, 0, 680, 23, 0)';
$query[7] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (7, "0.568: klasik (us-xxl-type)", 0, 0, 568, 0, 0)';
$query[8] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (8, "0.550: klasik (xxl-type)", 0, 0, 550, 0, 0)';
$query[9] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (9, "0.5: klasik (beer-type)", 67, 167, 500, 0, 1)';
$query[10] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (10, "0.473: klasik (us-ipa-type)", 0, 0, 473, 0, 0)';
$query[11] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (11, "0.443/15: klasik (monster-type)", 0, 0, 443, 15, 0)';
$query[12] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (12, "0.440: klasik (cider-type)", 0, 0, 440, 0, 0)';
$query[13] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (13, "0.4: klasik (cider-type)", 0, 0, 400, 0, 0)';
$query[14] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (14, "0.345: klasik (chups-type)", 66, 124, 345, 0, 0)';
$query[15] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (15, "0.355/12: klasik (us-beer-type)", 69, 122, 355, 12, 0)';
$query[16] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (16, "0.355: slim (limo-type)", 0, 0, 355, 0, 0)';
$query[17] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (17, "0.330: klasik (beer-type)", 62, 110, 330, 0, 0)';
$query[18] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (18, "0.330: slim (limo-type)", 61, 145, 330, 0, 0)';
$query[19] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (19, "0.280: slim (special-type)", 0, 0, 280, 0, 0)';
$query[20] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (20, "0.250: slim (energy-type)", 51, 134, 250, 0, 0)';
$query[21] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (21, "0.250: short (limo-type)", 0, 0, 250, 0, 0)';
$query[22] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (22, "0.240: short (coffe-type)", 0, 0, 240, 0, 0)';
$query[23] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (23, "0.2: slim (secco-type)", 0, 0, 200, 0, 0)';
$query[24] = 'INSERT INTO `can_type` (`id`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`) VALUES (24, "0.150: slim (cola-type)", 0, 0, 150, 0, 0)';

require_once 'get_config.php';
//require_once 'get_headers.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
$mysqli->select_db(DB_NAME);
echo 'table can_type: processing...';
for ($i = 1; $i <= count($query); $i++) {
    echo $mysqli->query($query[$i]);
    if ($mysqli->error)  { echo '<br>'.$mysqli->error; }
}
$mysqli->close();

echo '...done!<br>';
