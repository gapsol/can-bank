<?php

function my_connect($dbselect = true)
{
  $mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
  if ($mysqli->connect_error) {
    json_error_server($mysqli, $mysqli->connect_error);
  }
  if ($dbselect) {
    $mysqli->select_db(DB_NAME);
    if ($mysqli->error) {
      json_error_server($mysqli, $mysqli->error);
    }
  }

  return $mysqli;
}

function my_query($mysqli, $query)
{
  $result = $mysqli->query($query);
  if ($mysqli->error) {
    json_error_server($mysqli, $mysqli->error);
  }

  return $result;
}

function my_close($mysqli)
{
  return $mysqli->close();
}
