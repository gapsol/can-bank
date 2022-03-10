<?php

/*
 * REST API for canBank application
 * script: /country => POST: insert, GET:{0} stats {abbr} select, PUT:{abbr} update, DELETE:{abbr} delete
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
    || !isset($_GET['abbr'])
  ) {
    json_error_badrequest();
  }

  $return = [];
  $mysqli = my_connect();
  switch ($_GET['abbr']) {
    case '':
      $query = 'SELECT * FROM `can_country` WHERE `abbr`=(SELECT `key` FROM `can_default` WHERE `table`="country")
                UNION
                SELECT * FROM `can_country` WHERE `abbr`<>(SELECT `key` FROM `can_default` WHERE `table`="country" ORDER BY `name`)';
      $result = my_query($mysqli, $query);
      while ($row = $result->fetch_assoc()) {
        $row['default'] = (count($return) == 0);
        array_push($return, $row);
      }
      break;
    default:
      $query = 'SELECT * FROM `can_country` WHERE `abbr` = ' . $_GET['abbr'];
      $duery = 'SELECT `key` FROM `can_default` WHERE `table`="country"';
      $default = my_query($mysqli, $duery);
      $result = my_query($mysqli, $query);
      while ($row = $result->fetch_assoc()) {
        $row['default'] = ($default == $row['abbr']);
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
    isset($post)
    && isset($post->canFormName)
    && isset($post->canFormAbbr)
  ) {
    $post->canFormAbbr = strtoupper($post->canFormAbbr);
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_country` (`uniq`, `name`, `abbr`)
      VALUES (
      "' . $uniq . '",
      "' . $post->canFormName . '",
      "' . $post->canFormAbbr . '"
      )';
    $mysqli = my_connect();
    my_query($mysqli, $query);
    if ($mysqli->affected_rows > 0) {
      if ($post->canFormDefault) {
        postDefault($mysqli, $post->canFormAbbr);
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

function postDefault($mysqli, $abbr)
{
  $query = 'UPDATE `can_default` SET `key`="' . $abbr . '" WHERE `table`="country"';
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
  } else {
    json_error_nocontent($mysqli);
  }
}

// TODO: add update after edit
function putIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (empty($post)) {
    json_error_badrequest();
  }

  if (
    isset($post)
    && isset($post->canFormAbbr)
  ) {
    $query = 'UPDATE IGNORE `can_default`
      SET
        `key`="' . $post->canFormAbbr . '"
      WHERE
        `table`="country"';
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
    isset($post)
    && isset($post->canFormName)
    && isset($post->canFormAbbr)
  ) {
    $mysqli = my_connect();
    $uniq = gen_uniq();
    $query = 'UPDATE IGNORE `can_country`
      SET
        `uniq` = "' . $uniq . '",
        `name` = "' . $post->canFormName . '",
      WHERE
        `abbr` = ' . $post->canFormAbbr;
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
    || !isfull($_REQUEST['abbr'])
  ) {
    json_error_badrequest();
  }

  $query = 'DELETE FROM `can_country` WHERE `abbr` = "' . $_REQUEST['abbr'] . '"';
  $mysqli = my_connect();
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
  } else {
    json_error_nocontent($mysqli);
  }
}
