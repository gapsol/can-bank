<?php

/*
 * REST api for app canBank
 * generates returning jsons with exit codes for success/error
 * USED RESPONSES:
 * Success
 * 200	OK
 * 204	No Content
 * Client error
 * 400	Bad Request
 * 401	Unauthorized
 * Server error
 * 500	Internal Server Error
 */

// errorneous exit with error message json
function json_error($connection, $code = 500, $message = 'NOK')
{
  $connection->close();
  http_response_code($code);
  $j['status'] = 'error';
  $j['message'] = $message;
  print json_encode($j);
  exit();
}

// successful exit with success message json
function json_success($connection, $message = 'OK')
{
  $connection->close();
  http_response_code(200);
  $j['status'] = 'success';
  $j['message'] = $message;
  print json_encode($j);
  exit();
}

// successful exit json with encapsulated data package
function json_return($connection, $return_type = 'data', $return_data = '', $message = 'OK')
{
  $connection->close();
  http_response_code(200);
  $j['status'] = 'success';
  $j['message'] = $message;
  $j[$return_type] = $return_data;
  print json_encode($j);
  exit();
}
