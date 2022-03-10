<?php

/*
* $_FILES['input_name']
* "name":"5211019572.pdf",
* "type":"application\/pdf",
* "tmp_name":"C:\\wamp64\\tmp\\php68B6.tmp",
* "error":0,
* "size":514866
*/

require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $updir = '../api_files/';
    if (!file_exists($updir)) {
      mkdir($updir);
    }

    if (!empty($_FILES)) {
      $f = [];
      if (!empty($_FILES['file1']))
        $f[1] = move_uploaded_file($_FILES['file1']["tmp_name"], $updir . $_FILES['file1']["name"]);
      if (!empty($_FILES['file2']))
        $f[2] = move_uploaded_file($_FILES['file2']["tmp_name"], $updir . $_FILES['file2']["name"]);
      if (!empty($_FILES['file3']))
        $f[3] = move_uploaded_file($_FILES['file3']["tmp_name"], $updir . $_FILES['file3']["name"]);
      if (!empty($_FILES['file4']))
        $f[4] = move_uploaded_file($_FILES['file4']["tmp_name"], $updir . $_FILES['file4']["name"]);
      if (!empty($_FILES['file5']))
        $f[5] = move_uploaded_file($_FILES['file5']["tmp_name"], $updir . $_FILES['file5']["name"]);
      json_return(null, 'files', $f);
    }
    json_return(null, 'data', 'no data', 'no files');
    break;
  default:
    json_success();
}
