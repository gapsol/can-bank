<?php

/*
 * REST API for canBank application
 * script: /color => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'json_responses.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_error) {
  json_error($mysqli, 401, $mysqli->connect_error);
}
if ($mysqli->error) {
  json_error($mysqli, 500, $mysqli->error);
}

$query = '';
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (isset($_GET['id'])) {
      switch ($_GET['id']) {
        case 0:
          $query = 'SELECT * FROM `can_type` ORDER BY `name` DESC';
          break;
        default:
          $query = 'SELECT * FROM `can_type` WHERE id=' . $_GET['id'];
      }
    }
    break;
  case 'POST':
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_type` (`id`, `uniq`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`)
      VALUES (0,
      ' . $uniq . ',
      ' . $_REQUEST['name'] . ',
      ' . $_REQUEST['diameter'] . ',
      ' . $_REQUEST['height'] . ',
      ' . $_REQUEST['volume'] . ',
      ' . $_REQUEST['volumeFlOz'] . ',
      ' . $_REQUEST['default'] . ')';
    break;
  case 'PUT':
    if (isset($_REQUEST['id']) && $_REQUEST['id'] > 0) {
      $query = 'UPDATE IGNORE `can_type` SET
      `name`=' . $_REQUEST['name'] . ',
      `diameter`=' . $_REQUEST['diameter'] . ',
      `height`=' . $_REQUEST['height'] . ',
      `volume`=' . $_REQUEST['volume'] . ',
      `volumeFlOz`=' . $_REQUEST['volumeFlOz'] . ',
      `default`=' . $_REQUEST['default'] . '
      WHERE `id`=' . $_REQUEST['id'];
    }
    break;
  case 'DELETE':
    if (isset($_REQUEST['id']) && $_REQUEST['id'] > 0) {
      $query = 'DELETE IGNORE FROM `can_type` WHERE `id`=' . $_REQUEST['id'];
    }
    break;
  default:
    json_error($mysqli, 400, 'Bad request');
}

if (isset($query) && $query !== '') {
  $result = $mysqli->query($query);
  if ($mysqli->error) {
    json_error($mysqli, 500, $mysqli->error);
  }/* else if ($mysqli->num_rows === 0) {
    json_error($mysqli, 204, 'No data');
  }*/

  switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
      switch ($_GET['id']) {
        case 0:
          $return = [];
          while ($row = $result->fetch_assoc()) {
            $row['default'] = ($row['default'] == 1) ? true : false;
            array_push($return, $row);
          }
          json_return($mysqli, 'list', $return);
          break;
        default:
          $return = $result->fetch_assoc();
          json_return($mysqli, 'item', $return);
      }
      break;
    case 'POST':
    case 'PUT':
    case 'DELETE':
      if ($mysqli->affected_rows > 0) {
        json_success($mysqli);
      } else {
        json_error($mysqli, 500, 'Operation failed');
      }
      break;
    default:
      json_error($mysqli, 400, 'Bad request');
  }
} else {
  json_error($mysqli, 400, 'Bad request');
}
