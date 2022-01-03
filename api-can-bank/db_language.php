<?php

$query = [];
$query[1] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (1, "slovenský", "sk", 1)';
$query[2] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (2, "český", "cz", 0)';
$query[3] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (3, "poľský", "pl", 0)';
$query[4] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (4, "maďarský", "hu", 0)';
$query[5] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (5, "nemecký", "de", 0)';
$query[6] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (6, "francúzsky", "fr", 0)';
$query[7] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (7, "španielsky", "es", 0)';
$query[8] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (8, "katalánsky", "ca", 0)';
$query[9] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (9, "anglický", "en", 0)';
$query[10] = 'INSERT INTO `can_language` (`id`, `name`, `abbr`, `default`) VALUES (10, "ruský", "ru", 0)';

require_once 'get_config.php';
//require_once 'get_headers.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
$mysqli->select_db(DB_NAME);
echo 'table can_language: processing...';
for ($i = 1; $i <= count($query); $i++) {
    echo $mysqli->query($query[$i]);
    if ($mysqli->error)  {
        echo '<br>'.$mysqli->error;
    }
}
$mysqli->close();

echo '...done!<br>';
