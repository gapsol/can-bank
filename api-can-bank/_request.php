<?php

require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

$response = [];
$response['RQmethod'] = $_SERVER['REQUEST_METHOD'];
if (!empty($_COOKIE))
  $response['_COOKIE'] = $_COOKIE;
if (!empty($_GET))
  $response['_GET'] = $_GET;
if (!empty($_POST))
  $response['_POST'] = $_POST;
if (!empty($_FILES))
  $response['_FILES'] = $_FILES;
if (!empty($_REQUEST))
  $response['_REQUEST'] = $_REQUEST;
if (!empty($_SESSION))
  $response['_SESSION'] = $_SESSION;
if (!empty($_ENV))
  $response['_ENV'] = $_ENV;
if (!empty($_SERVER))
  $response['_SERVER'] = $_SERVER;

json_return(null, 'response', $response);
