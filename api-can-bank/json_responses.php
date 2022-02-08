<?php

/*
 * REST api for app canBank
 * generates returning jsons with exit codes for success/error
 */

// errorneous exit with error message json
function json_error($connection = null, $code = 400, $message = null, $info = null)
{
  $response = [
    200 => 'OK',
    204 => 'No Content',
    400 => 'Bad Request',
    401 => 'Unauthorized',
    404 => 'Not found',
    406 => 'Not Acceptable',
    410 => 'Gone',
    500 => 'Internal Server Error'
  ];

  if (!array_key_exists($code, $response)) {
    $code = 400;
  }
  if (isset($connection)) {
    $connection->close();
  }
  http_response_code($code);
  $j['status'] = 'error';
  $j['message'] = (!isset($message)) ? $response[$code] : $message;
  if (isset($info)) { $j['info'] = $info; }
  print json_encode($j);
  exit();
}

function json_error_nocontent($connection = null, $message = '')
{
  json_error($connection, 410, $message);
}

function json_error_badrequest($connection = null, $message = '')
{
  json_error($connection, 400, $message);
}

function json_error_unauthorized($connection = null, $message = '')
{
  json_error($connection, 401, $message);
}

function json_error_notfound($connection = null, $message = '')
{
  json_error($connection, 404, $message);
}

function json_error_notacceptable($connection = null, $message = '', $info = null)
{
  json_error($connection, 406, $message, $info);
}

function json_error_server($connection = null, $message = '')
{
  json_error($connection, 500, $message);
}

// successful exit with success message json
function json_success($connection = null, $message = '')
{
  if (isset($connection)) {
    $connection->close();
  }
  http_response_code(200);
  $j['status'] = 'success';
  $j['message'] = $message;
  print json_encode($j);
  exit();
}

// successful exit json with encapsulated data package
function json_return($connection = null, $return_type = 'data', $return_data = '', $message = 'OK')
{
  if (isset($connection)) {
    $connection->close();
  }
  http_response_code(200);
  $j['status'] = 'success';
  $j['message'] = $message;
  $j[$return_type] = $return_data;
  print json_encode($j);
  exit();
}
