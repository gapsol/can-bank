<?php

/*
 * create.php
 * REST API for canBank application
 * creates database and its tables
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'json_responses.php';

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_error) {
  json_error($mysqli, 401, $mysqli->connect_error);
}
if ($mysqli->error) {
  json_error($mysqli, 500, $mysqli->error);
}

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    get_canbank_state();
    break;
  case 'POST':
    create_canbank_db();
    break;
}

function get_canbank_state()
{
  global $mysqli;

  $table_error = [];
  $mysqli->query('SELECT COUNT(*) FROM `can_bank`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_type`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_surface`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_material`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_color`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_content`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_country`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  $mysqli->query('SELECT COUNT(*) FROM `can_language`');
  if ($mysqli->error) {
    array_push($table_error, $mysqli->error);
  }

  if (count($table_error) > 0) {
    json_error($mysqli, 500, $table_error);
  }

  json_success($mysqli, 'Database ready!');
}

function create_canbank_db()
{
  global $mysqli;
  $mysqli->query('CREATE DATABASE IF NOT EXISTS `' . DB_NAME . '` CHARACTER SET `'.DB_CHARSET.'` COLLATE `'.DB_COLLATION.'`');
  if ($mysqli->error) {
    json_error($mysqli, 500, $mysqli->error);
  }

  $mysqli->select_db(DB_NAME);
  if ($mysqli->error) {
    json_error($mysqli, 500, $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_bank` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`type` int,
`diameter` int,
`height` int,
`volume` double,
`volumeFlOz` int,
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
`country` int,
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
    json_error($mysqli, 500, 'can_bank' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_type` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`name` varchar(250),
`diameter` int,
`height` int,
`volume` double,
`volumeFlOz` int,
`default` tinyint
)');
  if ($mysqli->error) {
    json_error($mysqli, 500, 'can_type' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_material` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`name` varchar(100),
`abbr` varchar(3),
`color` varchar(50),
`default` tinyint
)');
  if ($mysqli->error) {
    json_error($mysqli, 500, 'can_material' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_surface` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`name` varchar(100),
`color` varchar(50),
`default` tinyint
)');
  if ($mysqli->error) {
    json_error($mysqli, 500, 'can_surface' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_color` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`name` varchar(100),
`color` varchar(50),
`default` tinyint
)');
  if ($mysqli->error) {
    json_error($mysqli, 500, 'can_color' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_content` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`name` varchar(100),
`default` tinyint
)');
  if ($mysqli->error) {
    json_error($mysqli, 500, 'can_content' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_country` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`name` varchar(100),
`abbr` varchar(3),
`default` tinyint
)');
  if ($mysqli->error) {
    json_error($mysqli, 500, 'can_country' . $mysqli->error);
  }

  $mysqli->query('CREATE TABLE IF NOT EXISTS `can_language` (
`id` int primary key auto_increment not null,
`tstamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`uniq` varchar(10),
`name` varchar(100),
`abbr` varchar(3),
`default` tinyint
)');
  if ($mysqli->error) {
    json_error($mysqli, 500, 'can_language' . $mysqli->error);
  }

  json_success($mysqli);
}
