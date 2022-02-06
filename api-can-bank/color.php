<?php

/*
 * REST API for canBank application
 * script: /color => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */

// TODO:
// delete confirmation inside page instead of JS alert
// error message inside page

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
  if (isset($_GET) && isset($_GET['id']) && $_GET['id'] >= 0) {
    switch ($_GET['id']) {
      case 0:
        $query = 'SELECT * FROM `can_color` ORDER BY `default` DESC,`name`';
        break;
      default:
        $query = 'SELECT * FROM `can_color` WHERE id = ' . $_GET['id'];
    }
    $mysqli = my_connect();
    $result = my_query($mysqli, $query);
    switch ($_GET['id']) {
      case 0:
        $return = [];
        while ($row = $result->fetch_assoc()) {
          $row['default'] = ($row['default'] == 1) ? true : false;
          array_push($return, $row);
        }
        break;
      default:
        $return = $result->fetch_assoc();
        $return['default'] = ($return['default'] == 1) ? true : false;
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
    isset($post->data)
    && isset($post->data->canFormName)
    && isset($post->data->canFormColor)
    && isset($post->data->canFormPicker)
  ) {
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_color`
      (`uniq`, `name`, `color`, `code`, `default`)
      VALUES (
      "' . $uniq . '",
      "' . $post->data->canFormName . '",
      "' . $post->data->canFormColor . '",
      "' . $post->data->canFormPicker . '",
      "false"
      )';
    $mysqli = my_connect();
    my_query($mysqli, $query);
    json_success($mysqli);
  } else {
    json_error_notacceptable();
  }
}

function putIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (
    isset($post->data)
    && isset($post->data->canFormId)
    && isset($post->data->canFormName)
    && isset($post->data->canFormColor)
    && isset($post->data->canFormPicker)
    && isset($post->data->canFormDefault)
  ) {
    $query = 'UPDATE IGNORE `can_color` SET `default` = false WHERE `default` = true';
    $mysqli = my_connect();
    my_query($mysqli, $query);
    $uniq = gen_uniq();
    $query = 'UPDATE IGNORE `can_color`
      SET
        `uniq` = "' . $uniq . '",
        `name` = "' . $post->data->canFormName . '",
        `color` = "' . $post->data->canFormColor . '",
        `code` = "' . $post->data->canFormPicker . '",
        `default` = "' . $post->data->canFormDefault . '"
      WHERE
        `id`=' . $post->data->canFormId;
    my_query($mysqli, $query);
    json_success($mysqli);
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
    $query = 'DELETE FROM `can_color` WHERE `id`=' . $_REQUEST['id'];
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
