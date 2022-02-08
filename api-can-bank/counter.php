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

if (
  $_SERVER['REQUEST_METHOD'] == 'GET'
  && isset($_GET)
  && isset($_GET['table'])
) {
  $table = 'can_' . $_GET['table'];
  switch ($table) {
    case 'can_type':
    case 'can_country':
    case 'can_bank':
      if (isset($_GET['fnc'])) {
        switch ($_GET['fnc']) {
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

  if (
    !isset($query)
    && !isset($query_p)
    && !isset($query_x)
  ) {
    json_error_badrequest($mysqli);
  } else if (isset($query)) {
    get_simple($query);
  } else {
    get_dates($query_p, $query_x);
  }
} else {
  json_error_notacceptable($mysqli);
}

function get_simple($query)
{
  $mysqli = my_connect();
  $result = my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    $return = $result->fetch_assoc();
    if (isset($return['COUNT(*)'])) {
      json_return($mysqli, 'count', $return['COUNT(*)']);
    }
  } else {
    json_error_nocontent($mysqli);
  }
}

function get_dates($query_p, $query_x)
{
  $mysqli = my_connect();
  $result_p = my_query($mysqli, $query_p);
  $affected_rows = 0;
  if ($mysqli->affected_rows > 0) {
    $affected_rows = $mysqli->affected_rows;
    $row_p = $result_p->fetch_assoc();
  }

  $result_x = my_query($mysqli, $query_x);
  if ($mysqli->affected_rows > 0) {
    $affected_rows += $mysqli->affected_rows;
    $row_x = $result_x->fetch_assoc();
  }

  if ($affected_rows > 0) {
    switch ($_REQUEST['fnc']) {
      case 'oldest':
        if (isset($row_p) && isset($row_x) && isfull($row_p['prod_date']) && isfull($row_x['exp_date'])) {
          $return = ($row_p['prod_date'] < $row_x['exp_date']) ? $row_p['prod_date'] : $row_x['exp_date'];
        } else if (isset($row_p) && isfull($row_p['prod_date'])) {
          $return = $row_p['prod_date'];
        } else {
          $return = $row_x['exp_date'];
        }
        break;
      case 'newest':
        if (isset($row_p) && isset($row_x) && isfull($row_p['prod_date']) && isfull($row_x['exp_date'])) {
          $return = ($row_p['prod_date'] > $row_x['exp_date']) ? $row_p['prod_date'] : $row_x['exp_date'];
        } else if (isset($row_p) && isfull($row_p['prod_date'])) {
          $return = $row_p['prod_date'];
        } else {
          $return = $row_x['exp_date'];
        }
        break;
    }
    json_return($mysqli, 'count', $return);
  } else {
    json_error_nocontent($mysqli);
  }
}
