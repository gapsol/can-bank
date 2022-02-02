<?php

/*
 * REST API for canBank application
 * script: /color => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

$query = '';
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (isset($_GET['id'])) {
      switch ($_GET['id']) {
        case 0:
          $query = 'SELECT * FROM `can_color` ORDER BY `default` DESC,`name`';
          break;
        default:
          $query = 'SELECT * FROM `can_color` WHERE id=' . $_GET['id'];
      }
    }
    if (isset($query) && isfull($query)) {
      $mysqli = my_connect();
      $result = my_query($mysqli, $query);

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
          json_return($mysqli, 'list', $return);
      }
    } else {
      json_error($mysqli, 400, 'Bad request');
    }
    break;
  case 'POST':
    $json = file_get_contents('php://input');
    $post = json_decode($json);
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_color`
    (`uniq`, `name`, `color`, `default`)
    VALUES (
"' . $uniq . '",
"' . $post->data->canFormName . '",
"' . $post->data->canFormColor . '",
"false"
    )';
    if (isset($query) && isfull($query)) {
      $mysqli = my_connect();
      if (my_query($mysqli, $query)) {
        json_success($mysqli);
      } else {
        json_error($mysqli, 500, $mysqli->error);
      }
    }
    break;
  case 'PUT':
    // TODO: check data integrity
    $json = file_get_contents('php://input');
    $post = json_decode($json);
    $uniq = gen_uniq();
    $query = 'UPDATE IGNORE `can_color`
    SET `default` = false WHERE `default` = true';
    if (isset($query) && isfull($query)) {
      $mysqli = my_connect();
      if (my_query($mysqli, $query)) {
        $query = 'UPDATE IGNORE `can_color`
        SET
          `uniq` = "' . $uniq . '",
          `name` = "' . $post->data->canFormName . '",
          `color` = "' . $post->data->canFormColor . '",
          `default` = "' . $post->data->canFormDefault . '"
        WHERE
          `id`=' . $post->data->canFormId;
        if (isset($query) && isfull($query)) {
          if (my_query($mysqli, $query)) {
            json_success($mysqli);
          } else {
            json_error($mysqli, 500, $mysqli->error);
          }
        }
      } else {
        json_error($mysqli, 500, $mysqli->error);
      }
    }
    break;
  case 'DELETE':
    // TODO: DELETE
    $query = 'DELETE FROM `can_color` WHERE `id`=' . $_REQUEST['id'];
    if (isset($query) && isfull($query)) {
      $mysqli = my_connect();
      if (my_query($mysqli, $query)) {
        json_success($mysqli);
      } else {
        json_error($mysqli, 500, $mysqli->error);
      }
    }
    break;
  default:
    json_error($mysqli, 400, 'Bad request');
}
