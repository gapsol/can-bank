<?php

/*
 * REST api for app canBank
 * generates returning jsons with exit codes for success/error
 */

// errorneous exit with error message json
function json_error($message = '') {
    $j['status'] = 'error';
    $j['message'] = $message;
    $json['data'] = $j;
    print json_encode($json);
    exit(400);
}

// successful exit with success message json
function json_success($message = '') {
    $j['status'] = 'success';
    $j['message'] = $message;
    $json['data'] = $j;
    print json_encode($json);
    exit(200);
}

// successful exit json with encapsulated data package
// defined by substructure { "return_type": "return_data" | { "return": "data" } }
function json_return($return_type, $return_data, $message = '') {
    $j['status'] = 'success';
    $j['message'] = $message;
    $j[$return_type] = $return_data;
    $json['data'] = $j;
    print json_encode($json);
    exit(200);
}
