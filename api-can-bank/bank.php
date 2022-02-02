<?php

/*
 * REST API for CanBank application
 * script: /bank =>
 *  POST: insert
 *  GET:{0} stats {id} select, {0, text} find
 *  PUT:{id} update
 *  DELETE:{id} delete
 *
 * filename scheme:
 * canbank/cb_ean_index.ext [cb_85801139009230_1.jpeg]
 * canbank/cb_datetime_index.ext [cb_211221122112_47.jpg]
 *
 * TODO:
 *  GET {0}
 *  GET {0, text} - atomize finding text
 *  GET {id}
 *  PUT {id}
 *  DELETE {id}
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

$query = '';
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (isset($_GET['id']) && $_GET['id'] > 0) {
      $query = 'SELECT * FROM `can_bank` WHERE id=' . $_GET['id'];
    } else if (isset($_GET['text'])) {
      $query = get_find_query($_GET['text']);
    }

    if (isset($query) && isfull($query)) {
      $mysqli = my_connect();
      $result = my_query($mysqli, $query);
      $return = [];
      while ($row = $result->fetch_assoc()) {
        array_push($return, $row);
      }
      json_return($mysqli, 'data', $return);
    }
    break;
  case 'POST':
    $json = file_get_contents('php://input');
    $post = json_decode($json);
    /*
    re_file($post->data->canFormFname1, $post->data->canFormEan);
    re_file($post->data->canFormFname2, $post->data->canFormEan);
    re_file($post->data->canFormFname3, $post->data->canFormEan);
    re_file($post->data->canFormFname4, $post->data->canFormEan);
    re_file($post->data->canFormFname5, $post->data->canFormEan);
    */
    $uniq = gen_uniq();
    $query = 'INSERT IGNORE INTO `can_bank`
(`uniq`, `type`, `diameter`, `height`, `volume`, `volumeFlOz`, `material`, `surface`, `cover_color`, `opener_color`, `brand`, `content_name`, `content_type`, `alcohol`, `keywords`, `prod_date`, `exp_date`, `prod_country`, `shop_country`, `language`, `ean`, `fname1`, `fname2`, `fname3`, `fname4`, `fname5`, `notes`)
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
"' . $post->data->canFormProdCountry . '",
"' . $post->data->canFormShopCountry . '",
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
    if (isset($query) && isfull($query)) {
      $mysqli = my_connect();
      $result = my_query($mysqli, $query);
      json_return($mysqli, 'data', $result);
    }
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
`prod_country`="' . $post->data->canFormProdCountry . '",
`shop_country`="' . $post->data->canFormShopCountry . '",
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

function get_find_query($text)
{
  $query = $text;
  $query = 'SELECT * FROM `can_bank` WHERE
      `brand` LIKE "%' . $_GET['text'] . '%" OR
      `content_name` LIKE "%' . $_GET['text'] . '%" OR
      `keywords` LIKE "%' . $_GET['text'] . '%" OR
      `ean` LIKE "%' . $_GET['text'] . '%" OR
      `notes` LIKE "%' . $_GET['text'] . '%"
      LIMIT 10';
  return $query;
}
/*
function re_file($file, $ean)
{
  if ($file === '') return false;
  do {
    $fn_dir = '/cbank';
    $fn_base = 'cb';
    $fn_core = (isfull($ean)) ? $ean : date('ymdhis');

  } while (file_exists($fname_base . '*.*'));
  $filename[1] = $fname_base . '_1' . 'ext';  // $post->data->canFormFname1
}
*/
