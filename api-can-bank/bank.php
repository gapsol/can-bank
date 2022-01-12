<?php

/*
 * REST API for canBank application
 * script: /bank => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 *
 * filename scheme:
 * canbank/cb_ean_index.ext [cb_85801139009230_1.jpeg]
 * canbank/cb_datetime_index.ext [cb_211221122112_47.jpg]
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'json_responses.php';

$query = '';
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (isset($_GET['id'])) {
      $query = 'SELECT * FROM `can_bank` WHERE id=' . $_GET['id'];
    }
    break;
  case 'POST':
    $json = file_get_contents('php://input');
    $post = json_decode($json);
    /*re_file($post->data->canFormFname1, $post->data->canFormEan);
    re_file($post->data->canFormFname2, $post->data->canFormEan);
    re_file($post->data->canFormFname3, $post->data->canFormEan);
    re_file($post->data->canFormFname4, $post->data->canFormEan);
    re_file($post->data->canFormFname5, $post->data->canFormEan);*/
    $uniq = gen_uniq();
    $query = 'INSERT INTO `can_bank`
(`uniq`, `type`, `diameter`, `height`, `volume`, `volumeFlOz`, `material`, `surface`, `cover_color`, `opener_color`, `brand`, `content_name`, `content_type`, `alcohol`, `keywords`, `prod_date`, `exp_date`, `country`, `language`, `ean`, `fname1`, `fname2`, `fname3`, `fname4`, `fname5`, `notes`)
VALUES (
"' . $uniq . '",
"' . $post->data->canFormType . '",
"' . $post->data->canFormTypeDetails->canFormDiameter . '",
"' . $post->data->canFormTypeDetails->canFormHeight . '",
"' . $post->data->canFormTypeDetails->canFormVolume . '",
"' . $post->data->canFormTypeDetails->canFormVolumeFlOz . '",
"' . $post->data->canFormMaterial . '",
"' . $post->data->canFormSurface . '",
"' . $post->data->canFormCoverColor . '",
"' . $post->data->canFormOpenerColor . '",
"' . $post->data->canFormBrand . '",
"' . $post->data->canFormContentName . '",
"' . $post->data->canFormContentType . '",
"' . $post->data->canFormAlcohol . '",
"' . $post->data->canFormKeywords . '",
"' . $post->data->canFormProdDate . '",
"' . $post->data->canFormExpDate . '",
"' . $post->data->canFormCountry . '",
"' . $post->data->canFormLanguage . '",
"' . $post->data->canFormEan . '",
"' . $post->data->canFormFname1 . '",
"' . $post->data->canFormFname2 . '",
"' . $post->data->canFormFname3 . '",
"' . $post->data->canFormFname4 . '",
"' . $post->data->canFormFname5 . '",
"' . $post->data->canFormNotes . '"
)';
    // $_FILE
    break;
  case 'PUT':
    $query = 'UPDATE IGNORE `can_bank` SET
`type`="' . $post->data->canFormType . '",
`diameter`="' . $post->data->canFormTypeDetails->canFormDiameter . '",
`height`="' . $post->data->canFormTypeDetails->canFormHeight . '",
`volume`="' . $post->data->canFormTypeDetails->canFormVolume . '",
`volumeFlOz`="' . $post->data->canFormTypeDetails->canFormVolumeFlOz . '",
`material`="' . $post->data->canFormMaterial . '",
`surface`="' . $post->data->canFormSurface . '",
`cover_color`="' . $post->data->canFormCoverColor . '",
`opener_color`="' . $post->data->canFormOpenerColor . '",
`brand`="' . $post->data->canFormBrand . '",
`content_name`="' . $post->data->canFormContentName . '",
`content_type`="' . $post->data->canFormContentType . '",
`alcohol`="' . $post->data->canFormAlcohol . '",
`keywords`="' . $post->data->canFormKeywords . '",
`prod_date`="' . $post->data->canFormProdDate . '",
`exp_date`="' . $post->data->canFormExpDate . '",
`country`="' . $post->data->canFormCountry . '",
`language`="' . $post->data->canFormLanguage . '",
`ean`="' . $post->data->canFormEan . '",
`fname1`="' . $post->data->canFormFname1 . '",
`fname2`="' . $post->data->canFormFname2 . '",
`fname3`="' . $post->data->canFormFname3 . '",
`fname4`="' . $post->data->canFormFname4 . '",
`fname5`="' . $post->data->canFormFname5 . '",
`notes`="' . $post->data->canFormNotes . '"
WHERE `id`=' . $_REQUEST['id'];
    break;
  case 'DELETE':
    $query = 'DELETE IGNORE FROM `can_bank` WHERE `id`=' . $_REQUEST['id'];
    break;
  default:
    json_error($mysqli, 500, 'No request');
}

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->connect_error) {
  json_error($mysqli, 500, $mysqli->connect_error);
}

$mysqli->select_db(DB_NAME);
if ($mysqli->error) {
  json_error($mysqli, 500, $mysqli->error);
}

$result = $mysqli->query($query);
if ($mysqli->error) {
  json_error($mysqli, 500, $mysqli->error);
}

json_return($mysqli, 'data', $result);

/*function re_file($file, $ean)
{
  if ($file === '') return false;
  do {
    $fn_dir = '/cbank';
    $fn_base = 'cb';
    $fn_core = (isfull($ean)) ? $ean : date('ymdhis');

  } while (file_exists($fname_base . '*.*'));
  $filename[1] = $fname_base . '_1' . 'ext';  // $post->data->canFormFname1
}*/
