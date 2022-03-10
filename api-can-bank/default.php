<?php

/*
 * REST API for canBank application
 * script: /color => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    getIt();
    break;
    /*  case 'POST':
    postIt();
    break;*/
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
    || !isfull($_GET['table'])
  ) {
    json_error_badrequest();
  }

  switch ($_GET['table']) {
    case 'can':
      $query = 'SELECT * FROM `can_default`';
      break;
    default:
      $query = 'SELECT `key` FROM `can_default` WHERE `table` = "' . $_GET['table'] . '"';
  }
  $mysqli = my_connect();
  $result = my_query($mysqli, $query);
  $return = [];
  while ($row = $result->fetch_assoc()) {
    array_push($return, $row);
  }
  json_return($mysqli, 'list', $return);
}

/*function postIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (empty($post)) {
    json_error_badrequest();
  }

  if (
    isset($post)
    && isset($post->canFormTable)
    && isset($post->canFormKey)
  ) {
    $mysqli = my_connect();
    $query = 'INSERT IGNORE INTO `can_default`
      (`table`, `key`)
      VALUES (
      "' . $post->canFormTable . '",
      "' . $post->canFormKey . '",
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
}*/

function putIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (empty($post)) {
    json_error_badrequest();
  }

  if (
    isset($post)
    && isset($post->canFormTable)
    && isset($post->canFormKey)
  ) {
    $mysqli = my_connect();
    $query = 'UPDATE IGNORE `can_default`
      SET `key` = ' . $post->canFormKey . ',
      WHERE `table`="' . $post->canFormTable . '"';
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
    || !isfull($_REQUEST['table'])
  ) {
    json_error_badrequest();
  }

  $query = 'UPDATE IGNORE `can_default`
    SET `key`=0
    WHERE `table`=' . $_REQUEST['table'];
  $mysqli = my_connect();
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
  } else {
    json_error_nocontent($mysqli);
  }
}
