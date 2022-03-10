<?php

/*
 * REST API for canBank application
 * script: /surface => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
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
    empty($_GET)
    || !isfull($_GET['id'])
    || $_GET['id'] < 0
  ) {
    json_error_badrequest();
  }

  $return = [];
  $mysqli = my_connect();
  switch ($_GET['id']) {
    case 0:
      $query = 'SELECT * FROM `can_surface` WHERE `id`=(SELECT `key` FROM `can_default` WHERE `table`="surface")
                UNION
                SELECT * FROM `can_surface` WHERE `id`<>(SELECT `key` FROM `can_default` WHERE `table`="surface" ORDER BY `name`)';
      $result = my_query($mysqli, $query);
      while ($row = $result->fetch_assoc()) {
        $row['default'] = (count($return) == 0);
        array_push($return, $row);
      }
      break;
    default:
      $query = 'SELECT * FROM `can_surface` WHERE id = ' . $_GET['id'];
      $duery = 'SELECT `key` FROM `can_default` WHERE `table`="surface"';
      $default = my_query($mysqli, $duery);
      $result = my_query($mysqli, $query);
      while ($row = $result->fetch_assoc()) {
        $row['default'] = ($default == $row['id']);
        array_push($return, $row);
      }
  }
  json_return($mysqli, 'list', $return);
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
    && isset($post->canFormPicker)
    && isset($post->canFormDefault)
  ) {
    $mysqli = my_connect();
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_surface`
      (`uniq`, `name`, `color`)
      VALUES (
      "' . $uniq . '",
      "' . $post->canFormName . '",
      "' . $post->canFormPicker . '"
      )';
    my_query($mysqli, $query);
    if ($mysqli->affected_rows > 0) {
      if ($post->canFormDefault) {
        postDefault($mysqli);
      } else {
        json_success($mysqli);
      }
    } else {
      json_error_nocontent($mysqli);
    }
  } else {
    json_error_notacceptable();
  }
}

function postDefault($mysqli)
{
  $query = 'UPDATE `can_default` SET `key`=' . $mysqli->insert_id . ' WHERE `table`="surface"';
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
  } else {
    json_error_nocontent($mysqli);
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
    isset($post)
    && isset($post->canFormId)
  ) {
    $query = 'UPDATE IGNORE `can_default`
      SET
        `key`=' . $post->canFormId . '
      WHERE
        `table`="surface"';
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
  /*if (
    isset($post->canFormId)
    && isset($post->canFormName)
    && isset($post->canFormPicker)
  ) {
    $uniq = gen_uniq();
    $mysqli = my_connect();
    $query = 'UPDATE IGNORE `can_surface`
      SET
        `uniq` = "' . $uniq . '",
        `name` = "' . $post->canFormName . '",
        `color` = "' . $post->canFormPicker . '",
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
  }*/
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

  $query = 'DELETE FROM `can_surface` WHERE `id` = ' . $_REQUEST['id'];
  $mysqli = my_connect();
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
  } else {
    json_error_nocontent($mysqli);
  }
}
