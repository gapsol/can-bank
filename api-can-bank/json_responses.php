<?php

/*
 * REST api for app canBank
 * generates returning jsons with exit codes for success/error
 */

// errorneous exit with error message json
function json_error($code = 500, $message = '') {
  $j['http_response_code'] = $code;
  $j['status'] = 'error';
  $j['message'] = $message;
  $json['data'] = $j;
  print json_encode($json);
  exit();
}

// successful exit with success message json
function json_success($message = '') {
  $j['http_response_code'] = 200;
  $j['status'] = 'success';
  $j['message'] = $message;
  $json['data'] = $j;
  print json_encode($json);
  exit();
}

// successful exit json with encapsulated data package
// defined by substructure { "return_type": "return_data" | { "return": "data" } }
function json_return($return_type, $return_data, $message = '') {
  $j['http_response_code'] = 200;
  $j['status'] = 'success';
  $j['message'] = $message;
  $j[$return_type] = $return_data;
  $json['data'] = $j;
  print json_encode($json);
  exit();
}
