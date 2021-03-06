<?php

/*
 * canbank.php
 * REST API for canBank application
 * GET: gets the database and tables state
 * POST: creates database and its tables
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'get_connection.php';
require_once 'json_responses.php';

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    getCanbank();
    break;
  case 'POST':
    createCanbank();
    break;
  default:
    json_success();
}

function getCanbank()
{
  $mysqli = my_connect();

  $table_error = [];
  $mysqli->query('SELECT COUNT(*) FROM `can_bank`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL0');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_color`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL1');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_content`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL2');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_country`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL3');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_language`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL4');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_material`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL5');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_surface`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL6');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_type`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL7');
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_default`');
  if ($mysqli->error) {
    array_push($table_error, 'levelL8');
  }

  if (count($table_error) > 0) {
    $s = (count($table_error) > 1) ? 's' : '';
    json_return($mysqli, 'data', $table_error, 'Missing table' . $s);
  }

  json_success($mysqli, 'Database ready!');
}

function createCanbank()
{
  $mysqli = my_connect(false);

  $query = 'CREATE DATABASE IF NOT EXISTS `' . DB_NAME . '` CHARACTER SET ' . DB_CHARSET . ' COLLATE ' . DB_COLLATION;
  my_query($mysqli, $query);

  $mysqli->select_db(DB_NAME);
  if ($mysqli->error) {
    json_error_server($mysqli, $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_bank` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `type` int,
    `diameter` int,
    `height` int,
    `volume` double,
    `volumeFlOz` double,
    `material` int,
    `surface` int,
    `cover_color` int,
    `opener_color` int,
    `brand` varchar(100),
    `content_name` varchar(100),
    `content_type` int,
    `alcohol` double,
    `keywords` varchar(255),
    `prod_date` varchar(10),
    `exp_date` varchar(10),
    `prod_country` int,
    `shop_country` int,
    `language` int,
    `ean` varchar(13),
    `fname1` varchar(100),
    `fname2` varchar(100),
    `fname3` varchar(100),
    `fname4` varchar(100),
    `fname5` varchar(100),
    `notes` varchar(250)
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_bank: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_color` (
    `id` int primary key auto_increment not null,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `name` varchar(100) NOT NULL,
    `color` varchar(50) NOT NULL,
    `code` varchar(10) NOT NULL
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_color: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_content` (
    `id` int primary key auto_increment not null,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `name` varchar(100) NOT NULL
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_content: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_country` (
    `id` int primary key auto_increment not null,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `name` varchar(100) NOT NULL,
    `abbr` varchar(3) NOT NULL
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_country: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_language` (
    `id` int primary key auto_increment not null,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `name` varchar(100) NOT NULL,
    `abbr` varchar(3) NOT NULL
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_language: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_material` (
    `id` int primary key auto_increment NOT NULL,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `name` varchar(100) NOT NULL,
    `abbr` varchar(3) NOT NULL,
    `color` varchar(10) NOT NULL
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_material: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_surface` (
    `id` int primary key auto_increment not null,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `name` varchar(100) NOT NULL,
    `color` varchar(10) NOT NULL
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_surface: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_type` (
    `id` int primary key auto_increment not null,
    `tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `uniq` varchar(13),
    `name` varchar(250) NOT NULL,
    `diameter` int,
    `height` int,
    `volume` double,
    `volumeFlOz` double
    )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_type: ' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_default` (
    `table` varchar(13) PRIMARY KEY NOT NULL,
    `key` int
  )');
  if ($mysqli->error) {
    json_error_server($mysqli, 'can_default: ' . $mysqli->error);
  }

  json_success($mysqli);
}
