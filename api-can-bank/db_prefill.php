<?php

require_once 'get_headers.php';
require_once 'get_config.php';
require_once 'json_responses.php';

$j = [];
require_once 'db_color.php';
require_once 'db_content.php';
require_once 'db_country.php';
require_once 'db_language.php';
require_once 'db_material.php';
require_once 'db_surface.php';
require_once 'db_type.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if (count($j) > 0) {
  json_error($mysqli, 500, $j);
} else {
  json_success($mysqli);
}
