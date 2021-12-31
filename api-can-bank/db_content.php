<?php

$query[1] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (1, "pivo", 1)';
$query[2] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (2, "radler", 0)';
$query[3] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (3, "cider", 0)';
$query[4] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (4, "limonáda", 0)';
$query[5] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (5, "energy drink", 0)';
$query[6] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (6, "voda", 0)';
$query[7] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (7, "káva", 0)';
$query[8] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (8, "víno", 0)';
$query[9] = 'INSERT INTO `can_content` (`id`, `name`, `default`) VALUES (9, "mix", 0)';

require_once 'get_config.php';
// require_once 'get_headers.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
$mysqli->select_db(DB_NAME);
for ($i = 1; $i <= count($query); $i++) {
    echo '<br>'.$mysqli->query($query[$i]);
    if ($mysqli->error)  {
        echo '<br>'.$mysqli->error;
    }
}
$mysqli->close();

echo '<br>can_content done!';
