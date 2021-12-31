<?php

$query[1] = 'INSERT INTO `can_surface` (`id`, `name`, `color`, `default`) VALUES (1, "lesklý", "lightgray", 1)';
$query[2] = 'INSERT INTO `can_surface` (`id`, `name`, `color`, `default`) VALUES (2, "matný", "silver", 0)';
$query[3] = 'INSERT INTO `can_surface` (`id`, `name`, `color`, `default`) VALUES (3, "fólia", "yellow", 0)';
$query[4] = 'INSERT INTO `can_surface` (`id`, `name`, `color`, `default`) VALUES (4, "papier", "white", 0)';
 
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

echo '<br>can_surface done!';
