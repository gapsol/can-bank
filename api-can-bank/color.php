<?php

/*
 * REST API for canBank application
 * script: /color => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'json_responses.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->connect_error) {
  json_error($mysqli, 500, $mysqli->connect_error);
}
$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  json_error($mysqli, 500, $mysqli->error);
}

$query = '';
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (isset($_GET['id'])) {
      switch ($_GET['id']) {
        case 0:
          $query = 'SELECT * FROM `can_color` ORDER BY `name`';
          break;
        default:
          $query = 'SELECT * FROM `can_color` WHERE id=' . $_GET['id'];
      }
    }
    break;
  default:
    json_error($mysqli, 500, 'Incorrect or undefined request');
}

if (isset($query) && isfull($query)) {
  $result = $mysqli->query($query);
  if ($mysqli->error) {
    json_error($mysqli, 500, $mysqli->error);
  }

  switch ($_GET['id']) {
    case 0:
      $return = [];
      while ($row = $result->fetch_assoc()) {
        array_push($return, $row);
      }
      json_return($mysqli, 'list', $return);
      break;
    default:
      $return = $result->fetch_assoc();
      json_return($mysqli, 'item', $return);
  }
} else {
  json_error($mysqli, 500, 'Incorrect request');
}
