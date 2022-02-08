<?php

/*
 * REST API for canBank application
 * script: /type => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

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
    json_success();
}

function getIt()
{
  if (
    isset($_GET)
    && isset($_GET['id'])
    && $_GET['id'] >= 0
  ) {
    switch ($_GET['id']) {
      case 0:
        $query = 'SELECT * FROM `can_type` ORDER BY `default` DESC, `name`';
        break;
      default:
        $query = 'SELECT * FROM `can_type` WHERE id = ' . $_GET['id'];
    }
    $mysqli = my_connect();
    $result = my_query($mysqli, $query);
    $return = [];
    while ($row = $result->fetch_assoc()) {
      $row['default'] = ($row['default'] == 1) ? true : false;
      array_push($return, $row);
    }
    if (count($return) > 0) {
      json_return($mysqli, 'list', $return);
    } else {
      json_error_nocontent($mysqli);
    }
  } else {
    json_error_notacceptable();
  }
}

function postIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (
    isset($post)
    && isset($post->canFormName)
    && isset($post->canFormDiameter)
    && isset($post->canFormHeight)
    && isset($post->canFormVolume)
    && isset($post->canFormVolumeFlOz)
    && isset($post->canFormDefault)
  ) {
    $mysqli = my_connect();
    if ($post->canFormDefault) {
      $query = 'UPDATE IGNORE `can_type` SET `default` = false WHERE `default` = true';
      my_query($mysqli, $query);
    }
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_type` (`uniq`, `name`, `diameter`, `height`, `volume`, `volumeFlOz`, `default`)
      VALUES (
        "' . $uniq . '",
        "' . $post->canFormName . '",
        "' . $post->canFormDiameter . '",
        "' . $post->canFormHeight . '",
        "' . $post->canFormVolume . '",
        "' . $post->canFormVolumeFlOz . '",
        "' . $post->canFormDefault . '"
      )';
    my_query($mysqli, $query);
    if ($mysqli->affected_rows > 0) {
      json_success($mysqli);
    } else {
      json_error_nocontent($mysqli);
    }
  } else {
    json_error_notacceptable();
  }
}

function putIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (
    isset($post)
    && isset($post->canFormId)
    && isset($post->canFormName)
    && isset($post->canFormDiameter)
    && isset($post->canFormHeight)
    && isset($post->canFormVolume)
    && isset($post->canFormVolumeFlOz)
    && isset($post->canFormDefault)
  ) {
    $query = 'UPDATE IGNORE `can_type` SET `default` = false WHERE `default` = true';
    $mysqli = my_connect();
    my_query($mysqli, $query);
    $uniq = gen_uniq();
    $query = 'UPDATE IGNORE `can_type`
      SET
        `uniq` = "' . $uniq . '",
        `name` = "' . $post->canFormName . '",
        `diameter` = "' . $post->canFormDiameter . '",
        `height` = "' . $post->canFormHeight . '",
        `volume` = "' . $post->canFormVolume . '",
        `volumefloz` = "' . $post->canFormVolumeFlOz . '",
        `default` = "' . $post->canFormDefault . '"
      WHERE
        `id` = ' . $post->canFormId;
    my_query($mysqli, $query);
    if ($mysqli->affected_rows > 0) {
      json_success($mysqli);
    } else {
      json_error_nocontent($mysqli);
    }
  } else {
    json_error_notacceptable();
  }
}

function deleteIt()
{
  if (
    isset($_REQUEST)
    && isset($_REQUEST['id'])
    && $_REQUEST['id'] > 0
  ) {
    $query = 'DELETE FROM `can_type` WHERE `id` = ' . $_REQUEST['id'];
    $mysqli = my_connect();
    my_query($mysqli, $query);
    if ($mysqli->affected_rows > 0) {
      json_success($mysqli);
    } else {
      json_error_nocontent($mysqli);
    }
  } else {
    json_error_notacceptable();
  }
}
