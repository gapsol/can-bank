<?php

/*
 * REST API for CanBank application
 * script: /bank =>
 *  POST: insert
 *  GET:{0} stats {id} select, {0, text} find
 *  PUT:{id} update
 *  DELETE:{id} delete
 TODO: filename scheme:
 * canbank/cb_ean_index.ext [cb_85801139009230_1.jpeg]
 * canbank/cb_datetime_index.ext [cb_211221122112_47.jpg]
 *
 TODO:
 *  GET {0, text} - atomize finding text
 *  PUT {id}
 *  DELETE {id}
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    getIt();
    break;
  case 'POST':
    postIt();
    break;
  case 'PUT':
    putIt();
    break;
  case 'DELETE':
    deleteIt();
    break;
  default:
    json_success();
}

function getIt()
{
  if (!isset($_GET)) {
    json_error_badrequest();
  }
  if (
    isset($_GET['id'])
    && $_GET['id'] >= 0
  ) {
    switch ($_GET['id']) {
      case 0:
        if (
          isset($_GET['text'])
          && isfull($_GET['text'])
        ) {
          $query = get_find_query($_GET['text']);
        } else {
          $query = 'SELECT * FROM `can_bank` ORDER BY `id` DESC';
        }
        break;
      default:
        $query = 'SELECT * FROM `can_bank` WHERE id=' . $_GET['id'];
    }
  } else {
    json_error_badrequest();
  }

  $mysqli = my_connect();
  $result = my_query($mysqli, $query);
  $return = [];
  while ($row = $result->fetch_assoc()) {
    array_push($return, $row);
  }
  json_return($mysqli, 'list', $return);
}

function postIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (!isset($post)) {
    json_error_badrequest();
  }

  /*
  re_file($post->canFormFname1, $post->canFormEan);
  re_file($post->canFormFname2, $post->canFormEan);
  re_file($post->canFormFname3, $post->canFormEan);
  re_file($post->canFormFname4, $post->canFormEan);
  re_file($post->canFormFname5, $post->canFormEan);
  */
  $uniq = gen_uniq();
  $query = 'INSERT IGNORE INTO `can_bank`
(`uniq`, `type`, `diameter`, `height`, `volume`, `volumeFlOz`, `material`, `surface`, `cover_color`, `opener_color`,
`brand`, `content_name`, `content_type`, `alcohol`, `keywords`, `prod_date`, `exp_date`, `prod_country`, `shop_country`, `language`, `ean`,
`fname1`, `fname2`, `fname3`, `fname4`, `fname5`, `notes`)
VALUES (
"' . $uniq . '",
"' . $post->canFormType . '",
"' . $post->canFormTypeDetails->canFormDiameter . '",
"' . $post->canFormTypeDetails->canFormHeight . '",
"' . $post->canFormTypeDetails->canFormVolume . '",
"' . $post->canFormTypeDetails->canFormVolumeFlOz . '",
"' . $post->canFormMaterial . '",
"' . $post->canFormSurface . '",
"' . $post->canFormCoverColor . '",
"' . $post->canFormOpenerColor . '",
"' . $post->canFormBrand . '",
"' . $post->canFormContentName . '",
"' . $post->canFormContentType . '",
"' . $post->canFormAlcohol . '",
"' . $post->canFormKeywords . '",
"' . $post->canFormProdDate . '",
"' . $post->canFormExpDate . '",
"' . $post->canFormProdCountry . '",
"' . $post->canFormShopCountry . '",
"' . $post->canFormLanguage . '",
"' . $post->canFormEan . '",
"' . $post->canFormFname1 . '",
"' . $post->canFormFname2 . '",
"' . $post->canFormFname3 . '",
"' . $post->canFormFname4 . '",
"' . $post->canFormFname5 . '",
"' . $post->canFormNotes . '"
)';

  $mysqli = my_connect();
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
    // TODO: $_FILE
  } else {
    json_error_nocontent($mysqli);
  }
}

function putIt()
{
  $json = file_get_contents('php://input');
  $post = json_decode($json);
  if (!isset($post)) {
    json_error_badrequest();
  }

  $query = 'UPDATE IGNORE `can_bank` SET
    `type`="' . $post->canFormType . '",
    `diameter`="' . $post->canFormTypeDetails->canFormDiameter . '",
    `height`="' . $post->canFormTypeDetails->canFormHeight . '",
    `volume`="' . $post->canFormTypeDetails->canFormVolume . '",
    `volumeFlOz`="' . $post->canFormTypeDetails->canFormVolumeFlOz . '",
    `material`="' . $post->canFormMaterial . '",
    `surface`="' . $post->canFormSurface . '",
    `cover_color`="' . $post->canFormCoverColor . '",
    `opener_color`="' . $post->canFormOpenerColor . '",
    `brand`="' . $post->canFormBrand . '",
    `content_name`="' . $post->canFormContentName . '",
    `content_type`="' . $post->canFormContentType . '",
    `alcohol`="' . $post->canFormAlcohol . '",
    `keywords`="' . $post->canFormKeywords . '",
    `prod_date`="' . $post->canFormProdDate . '",
    `exp_date`="' . $post->canFormExpDate . '",
    `prod_country`="' . $post->canFormProdCountry . '",
    `shop_country`="' . $post->canFormShopCountry . '",
    `language`="' . $post->canFormLanguage . '",
    `ean`="' . $post->canFormEan . '",
    `fname1`="' . $post->canFormFname1 . '",
    `fname2`="' . $post->canFormFname2 . '",
    `fname3`="' . $post->canFormFname3 . '",
    `fname4`="' . $post->canFormFname4 . '",
    `fname5`="' . $post->canFormFname5 . '",
    `notes`="' . $post->canFormNotes . '"
  WHERE `id`=' . $post->canFormId;

  $mysqli = my_connect();
  my_query($mysqli, $query);
  if ($mysqli->affected_rows > 0) {
    json_success($mysqli);
  } else {
    json_error_nocontent($mysqli);
  }
}

function deleteIt()
{
  if (
    isset($_REQUEST)
    && isset($_REQUEST['id'])
    && $_REQUEST['id'] > 0
  ) {
    $query = 'DELETE IGNORE FROM `can_bank` WHERE `id`=' . $_REQUEST['id'];

    $mysqli = my_connect();
    my_query($mysqli, $query);
    if ($mysqli->affected_rows > 0) {
      json_success($mysqli);
    } else {
      json_error_nocontent($mysqli);
    }
  }
}

function get_find_query($text)
{
  $query = $text;
  $query = 'SELECT * FROM `can_bank` WHERE
      `brand` LIKE "%' . $_GET['text'] . '%" OR
      `content_name` LIKE "%' . $_GET['text'] . '%" OR
      `keywords` LIKE "%' . $_GET['text'] . '%" OR
      `ean` LIKE "%' . $_GET['text'] . '%" OR
      `notes` LIKE "%' . $_GET['text'] . '%"';
  // TODO: make this query more complex
  return $query;
}
/*
function re_file($file, $ean)
{
  if ($file == '') return false;
  do {
    $fn_dir = '/cbank';
    $fn_base = 'cb';
    $fn_core = (isfull($ean)) ? $ean : date('ymdhis');

  } while (file_exists($fname_base . '*.*'));
  $filename[1] = $fname_base . '_1' . 'ext';  // $post->canFormFname1
}
*/
