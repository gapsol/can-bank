<?php

/*
 * REST API for canBank application
 * script: /bank => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
 *
 * filename scheme:
 * canbank/cb_datetime_index.ext [cb_211221122112_1.jpg]
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'json_responses.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if ($_GET && isset($_GET['id'])) {
            $query = 'SELECT * FROM `can_bank` WHERE id='.$_GET['id'];
        }
        break;
    case 'POST':
        $json = file_get_contents('php://input');
        $post = json_decode($json);
        if ($post->data->canFormFname1 !== '') {
            do {
                $fname_base = 'cb_'.time();
                // find file with fname_base core
            } while (file_exists($fname_base.'*.*'));
            $filename[1] = $fname_base.'_1'.'ext';  // $post->data->canFormFname1
        }
            /*|| $post->data->canFormFname2 !== ''
            || $post->data->canFormFname3 !== ''
            || $post->data->canFormFname4 !== ''
            || $post->data->canFormFname5 !== '') {

            }*/
        $query = 'INSERT INTO `can_bank` (`id`, `type`, `diameter`, `height`, `volume`, `volumeFlOz`, `material`, `surface`, `cover_color`, `opener_color`, `brand`, `content_name`, `content_type`, `alcohol`, `keywords`, `prod_date`, `exp_date`, `country`, `language`, `ean`, `fname1`, `fname2`, `fname3`, `fname4`, `fname5`, `notes`)
            VALUES (0,
"'.$post->data->canFormType.'",
"'.$post->data->canFormTypeDetails->canFormDiameter.'",
"'.$post->data->canFormTypeDetails->canFormHeight.'",
"'.$post->data->canFormTypeDetails->canFormVolume.'",
"'.$post->data->canFormTypeDetails->canFormVolumeFlOz.'",
"'.$post->data->canFormMaterial.'",
"'.$post->data->canFormSurface.'",
"'.$post->data->canFormCoverColor.'",
"'.$post->data->canFormOpenerColor.'",
"'.$post->data->canFormBrand.'",
"'.$post->data->canFormContentName.'",
"'.$post->data->canFormContentType.'",
"'.$post->data->canFormAlcohol.'",
"'.$post->data->canFormKeywords.'",
"'.$post->data->canFormProdDate.'",
"'.$post->data->canFormExpDate.'",
"'.$post->data->canFormCountry.'",
"'.$post->data->canFormLanguage.'",
"'.$post->data->canFormEan.'",
"'.$post->data->canFormFname1.'",
"'.$post->data->canFormFname2.'",
"'.$post->data->canFormFname3.'",
"'.$post->data->canFormFname4.'",
"'.$post->data->canFormFname5.'",
"'.$post->data->canFormNotes.'"
)';
        break;
    case 'PUT':
        $put = file_get_contents('php://input');
        var_dump($put);
        break;
    case 'DELETE':
        $del = file_get_contents('php://input');
        var_dump($del);
        break;
    default:
        json_error('No request');
}

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($mysqli->connect_error) { json_error($mysqli->connect_error); }

$mysqli->select_db(DB_NAME);
if ($mysqli->error) { json_error($mysqli->error); }

$result = $mysqli->query($query);
if ($mysqli->error) { json_error($mysqli->error); }
//$return = $result->fetch_assoc();
$mysqli->close();

json_return('data', $result);
