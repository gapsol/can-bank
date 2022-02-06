<?php

/*
 * REST API for canBank application
 * script: /type => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

$mysqli = my_connect();

$query = '';
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    getIt();
    break;
  case 'POST':
    postIt();
    break;
  case 'PUT':
    putIt();
    break;
  case 'DELETE':
    deleteIt();
    break;
  default:
    json_error($mysqli, 400, 'Bad request');
}

function getIt()
{
  global $mysqli;

  if (
    isset($_GET['id'])
    && isfull($_GET['id'])
  ) {
    switch ($_GET['id']) {
      case 0:
        $query = 'SELECT * FROM `can_type` ORDER BY `name` DESC';
        break;
      default:
        $query = 'SELECT * FROM `can_type` WHERE id=' . $_GET['id'];
    }

    $result = $mysqli->query($query);
    if ($mysqli->error) {
      json_error($mysqli, 500, $mysqli->error);
    }

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
  } else {
    json_error($mysqli, 400);
  }
}

function postIt()
{
  global $mysqli;

  if (
    isset($_REQUEST)
    && isset($_REQUEST['name'])
    && isset($_REQUEST['diameter'])
    && isset($_REQUEST['height'])
    && isset($_REQUEST['volume'])
    && isset($_REQUEST['volumeFlOz'])
    && isset($_REQUEST['default'])
  ) {
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_type` (`id`, `uniq`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`)
    VALUES (0,
    "' . $uniq . '",
    "' . $_REQUEST['name'] . '",
    "' . $_REQUEST['diameter'] . '",
    "' . $_REQUEST['height'] . '",
    "' . $_REQUEST['volume'] . '",
    "' . $_REQUEST['volumeFlOz'] . '",
    "' . $_REQUEST['default'] . '")';
  } else {
    json_error($mysqli, 400);
  }

  if ($mysqli->query($query)) {
    json_success($mysqli);
  } else if ($mysqli->error) {
    json_error($mysqli, 500, $mysqli->error);
  } else {
    json_error($mysqli, 500);
  }
}

function putIt()
{
  global $mysqli;

  if (
    isset($_REQUEST['id'])
    && $_REQUEST['id'] > 0
  ) {
    $query = 'UPDATE IGNORE `can_type` SET
    `name` = "' . $_REQUEST['name'] . '",
    `diameter` = "' . $_REQUEST['diameter'] . '",
    `height` = "' . $_REQUEST['height'] . '",
    `volume` = "' . $_REQUEST['volume'] . '",
    `volumeFlOz` = "' . $_REQUEST['volumeFlOz'] . '",
    `default` = "' . $_REQUEST['default'] . '"
    WHERE `id` = ' . $_REQUEST['id'];
  } else {
    json_error($mysqli, 400);
  }

  if ($mysqli->query($query)) {
    json_success($mysqli);
  } else if ($mysqli->error) {
    json_error($mysqli, 500, $mysqli->error);
  } else {
    json_error($mysqli, 500);
  }
}

function deleteIt()
{
  global $mysqli;

  if (
    isset($_REQUEST['id'])
    && $_REQUEST['id'] > 0
  ) {
    $query = 'DELETE IGNORE FROM `can_type` WHERE `id`=' . $_REQUEST['id'];
  } else {
    json_error($mysqli, 400);
  }

  if ($mysqli->query($query)) {
    json_success($mysqli);
  } else if ($mysqli->error) {
    json_error($mysqli, 500, $mysqli->error);
  } else {
    json_error($mysqli, 500);
  }
}
