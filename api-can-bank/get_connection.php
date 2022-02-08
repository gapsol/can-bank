<?php

function my_connect()
{
  $mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
  if ($mysqli->connect_error) {
    json_error_server($mysqli, $mysqli->connect_error);
  }
  if ($mysqli->error) {
    json_error_server($mysqli, $mysqli->error);
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
