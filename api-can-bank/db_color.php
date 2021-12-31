<?php

$query[1] = 'INSERT INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (1, "kov - strieborný", "silver", 1)';
$query[2] = 'INSERT INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (2, "kov - žltý", "gold", 0)';
$query[3] = 'INSERT INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (3, "modrá", "blue", 0)';
$query[4] = 'INSERT INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (4, "červená", "red", 0)';
$query[5] = 'INSERT INTO `can_color` (`id`, `name`, `color`, `default`) VALUES (5, "žltá", "yellow", 0)';

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

echo '<br>can_color done!';
