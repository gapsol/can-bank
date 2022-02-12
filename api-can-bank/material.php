<?php

/*
 * REST API for canBank application
 * script: /material => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

$query = '';
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    getIt();
    break;
  case 'POST':
    postIt();
  case 'PUT':
    putIt();
  case 'DELETE':
    deleteIt();
  default:
    json_success($mysqli);
}

function getIt()
{
  if (
    empty($_GET)
    || !isfull($_GET['id'])
    || $_GET['id'] < 0
  ) {
    json_error_badrequest();
  }

  switch ($_GET['id']) {
    case 0:
      $query = 'SELECT * FROM `can_material` ORDER BY `default` DESC, `name`';
      break;
    default:
      $query = 'SELECT * FROM `can_material` WHERE id = ' . $_GET['id'];
  }
  $mysqli = my_connect();
  $result = my_query($mysqli, $query);
  $return = [];
  while ($row = $result->fetch_assoc()) {
    $row['default'] = ($row['default'] == 1) ? true : false;
    array_push($return, $row);
  }
  //if (count($return) > 0) {
    json_return($mysqli, 'list', $return);
  /*} else {
    json_nocontent($mysqli);
  }*/
}

function postIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (empty($post)) {
    json_error_badrequest();
  }

  if (
    isset($post->canFormName)
    && isset($post->canFormAbbr)
    && isset($post->canFormPicker)
    && isset($post->canFormDefault)
  ) {
    $mysqli = my_connect();
    if ($post->canFormDefault) {
      $query = 'UPDATE IGNORE `can_material` SET `default` = false WHERE `default` = true';
      my_query($mysqli, $query);
    }
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_material` (`uniq`, `name`, `abbr`, `color`, `default`)
      VALUES (
      "' . $uniq . '",
      "' . $post->canFormName . '",
      "' . $post->canFormAbbr . '",
      "' . $post->canFormPicker . '",
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
  if (empty($post)) {
    json_error_badrequest();
  }

  if (
    isset($post->canFormId)
    && isset($post->canFormName)
    && isset($post->canFormAbbr)
    && isset($post->canFormPicker)
    && isset($post->canFormDefault)
  ) {
    $uniq = gen_uniq();
    $query = 'UPDATE IGNORE `can_material` SET `default` = false WHERE `default` = true';
    $mysqli = my_connect();
    my_query($mysqli, $query);
    $query = 'UPDATE IGNORE `can_material`
      SET
        `uniq` = "' . $uniq . '",
        `name` = "' . $post->canFormName . '",
        `abbr` = "' . $post->canFormAbbr . '",
        `color` = "' . $post->canFormPicker . '",
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
    empty($_REQUEST)
    || !isfull($_REQUEST['id'])
    || $_REQUEST['id'] <= 0
  ) {
    json_error_badrequest();
  }
  $query = 'DELETE FROM `can_material` WHERE `id` = ' . $_REQUEST['id'];
  $mysqli = my_connect();
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
  } else {
    json_error_nocontent($mysqli);
  }
}
