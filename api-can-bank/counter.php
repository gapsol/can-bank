<?php

/*
 * API for can-bank application
 * script home.php
 * counts existing records from the database canbank tables
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'json_responses.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->connect_error) {
  json_error(500, $mysqli->connect_error);
}

$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  json_error($mysqli, 500, $mysqli->error);
}

$query = '';
if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_REQUEST && isset($_REQUEST['table'])) {
  $table = 'can_' . $_REQUEST['table'];
  switch ($table) {
    case 'can_type':
    case 'can_country':
    case 'can_bank':
      if (isset($_REQUEST['fnc'])) {
        switch ($_REQUEST['fnc']) {
          case 'oldest':
            $query = 'SELECT `prod_date` FROM `can_bank` ORDER BY `prod_date` ASC LIMIT 1';
            break;
          case 'newest':
            $query = 'SELECT `prod_date` FROM `can_bank` ORDER BY `prod_date` DESC LIMIT 1';
            break;
        }
      } else {
        $query = 'SELECT COUNT(*) FROM `' . $table . '`';
      }
  }

  if (!isfull($query)) {
    json_error($mysqli, 500, 'Incorrect request');
  } else {
    $result = $mysqli->query($query);
    if ($mysqli->error) {
      json_error($mysqli, 500, $mysqli->error);
    }
    // $mysqli->close();

    if ($mysqli->affected_rows > 0) {
      $return = $result->fetch_assoc();
      if (isset($return['COUNT(*)'])) {
        json_return($mysqli, 'count', $return['COUNT(*)']);
      } else if (isset($return['prod_date'])) {
        json_return($mysqli, 'count', $return['prod_date']);
      } else {
        json_return($mysqli, 'count', 0);
      }
    } else {
      json_return($mysqli, 'count', 0);
    }
  }
} else {
  json_error($mysqli, 500, 'Incorrect request');
}
