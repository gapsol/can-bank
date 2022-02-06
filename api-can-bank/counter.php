<?php

/*
 * API for can-bank application
 * script home.php
 * counts existing records from the database canbank tables
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_error) {
  json_error($mysqli, 401, $mysqli->connect_error);
}
if ($mysqli->error) {
  json_error($mysqli, 500, $mysqli->error);
}

$query = '';
if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_REQUEST) && isset($_REQUEST['table'])) {
  $table = 'can_' . $_REQUEST['table'];
  switch ($table) {
    case 'can_type':
    case 'can_country':
    case 'can_bank':
      if (isset($_REQUEST['fnc'])) {
        switch ($_REQUEST['fnc']) {
          case 'oldest':
            $query_p = 'SELECT `prod_date` FROM `can_bank` WHERE `prod_date`<>"" ORDER BY `prod_date` ASC LIMIT 1';
            $query_x = 'SELECT `exp_date` FROM `can_bank` WHERE `exp_date`<>"" ORDER BY `exp_date` ASC LIMIT 1';
            break;
          case 'newest':
            $query_p = 'SELECT `prod_date` FROM `can_bank` WHERE `prod_date`<>"" ORDER BY `prod_date` DESC LIMIT 1';
            $query_x = 'SELECT `exp_date` FROM `can_bank` WHERE `exp_date`<>"" ORDER BY `exp_date` DESC LIMIT 1';
            break;
        }
      } else {
        $query = 'SELECT COUNT(*) FROM `' . $table . '`';
      }
  }

  if (!isfull($query) && !isfull($query_p) && !isfull($query_x)) {
    json_error($mysqli, 400, 'Bad request');
  } else if (isfull($query)) {
    $result = $mysqli->query($query);
    if ($mysqli->error) {
      json_error($mysqli, 500, $mysqli->error);
    }

    if ($mysqli->affected_rows > 0) {
      $return = $result->fetch_assoc();
      if (isset($return['COUNT(*)'])) {
        json_return($mysqli, 'count', $return['COUNT(*)']);
      } else {
        json_error($mysqli, 204, 'No content');
      }
    } else {
      json_return($mysqli, 'count', 0);
    }
  } else {
    $result_p = $mysqli->query($query_p);
    if ($mysqli->error) {
      json_error($mysqli);
    }
    $affected_rows = 0;
    if ($mysqli->affected_rows > 0) {
      $affected_rows = $mysqli->affected_rows;
      $row_p = $result_p->fetch_assoc();
    }

    $result_x = $mysqli->query($query_x);
    if ($mysqli->error) {
      json_error($mysqli);
    }
    if ($mysqli->affected_rows > 0) {
      $affected_rows += $mysqli->affected_rows;
      $row_x = $result_x->fetch_assoc();
    }

    if ($affected_rows > 0) {
      switch ($_REQUEST['fnc']) {
        case 'oldest':
          if (isset($row_p) && isset($row_x) && isfull($row_p['prod_date']) && isfull($row_x['exp_date'])) {
            $return = ($row_p['prod_date']<$row_x['exp_date']) ? $row_p['prod_date'] : $row_x['exp_date'];
          } else if (isset($row_p) && isfull($row_p['prod_date'])) {
            $return = $row_p['prod_date'];
          } else {
            $return = $row_x['exp_date'];
          }
          break;
        case 'newest':
          if (isset($row_p) && isset($row_x) && isfull($row_p['prod_date']) && isfull($row_x['exp_date'])) {
            $return = ($row_p['prod_date']>$row_x['exp_date']) ? $row_p['prod_date'] : $row_x['exp_date'];
          } else if (isset($row_p) && isfull($row_p['prod_date'])) {
            $return = $row_p['prod_date'];
          } else {
            $return = $row_x['exp_date'];
          }
          break;
      }
      // TODO: extra data for expired and produced
      json_return($mysqli, 'count', $return);
    } else {
      json_return($mysqli, 'count', 0);
    }
  }
} else {
  json_error($mysqli, 400, 'Bad request');
}
