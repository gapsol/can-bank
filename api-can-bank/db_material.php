<?php

$query[1] = 'INSERT INTO `can_material` (`id`, `name`, `abbr`, `color`, `default`) VALUES (1, "hliník", "Al", "silver", 1)';
$query[2] = 'INSERT INTO `can_material` (`id`, `name`, `abbr`, `color`, `default`) VALUES (2, "oceľ", "Fe", "gray", 0)';
    
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

echo '<br>can_material done!';
