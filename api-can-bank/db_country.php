<?php

$query[1] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (1, "Slovensko", "SK", 1)';
$query[2] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (2, "Česko", "CZ", 0)';
$query[3] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (3, "Poľsko", "PL", 0)';
$query[4] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (4, "Maďarsko", "HU", 0)';
$query[5] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (5, "Nemecko", "DE", 0)';
$query[6] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (6, "Rakúsko", "AT", 0)';
$query[7] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (7, "Francúzsko", "FR", 0)';
$query[8] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (8, "Španielsko", "ES", 0)';
$query[9] = 'INSERT INTO `can_country` (`id`, `name`, `abbr`, `default`) VALUES (9, "Ukrajina", "UA", 0)';

require_once 'get_config.php';
//require_once 'get_headers.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
$mysqli->select_db(DB_NAME);
for ($i = 1; $i <= count($query); $i++) {
    echo '<br>'.$mysqli->query($query[$i]);
    if ($mysqli->error)  {
        echo '<br>'.$mysqli->error;
    }
}
$mysqli->close();

echo '<br>can_country done!';
