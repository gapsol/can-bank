<?php

/*
 * create.php
 * REST API for canBank application
 * creates database and its tables
 */
require_once 'get_config.php';
require_once 'get_headers.php';
require_once 'json_responses.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        get_canbank_state();
        break;
    case 'POST':
        create_canbank_db();
        break;
}

function get_canbank_state() {
$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
    if ($mysqli->connect_error) { json_error(401, $mysqli->connect_error); }

    $mysqli->select_db(DB_NAME);
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $table_error = [];
    $table_index = 0;
    $mysqli->query('select count(*) from `can_bank`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }

    $mysqli->query('select count(*) from `can_type`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }

    $mysqli->query('select count(*) from `can_surface`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }

    $mysqli->query('select count(*) from `can_material`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }

    $mysqli->query('select count(*) from `can_color`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }

    $mysqli->query('select count(*) from `can_content`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }

    $mysqli->query('select count(*) from `can_country`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }

    $mysqli->query('select count(*) from `can_language`');
    if ($mysqli->error) { $table_error[$table_index++] = $mysqli->error; }
    if ($table_index > 0) {
      json_error(500, $table_error);
    }

    $mysqli->close();
    json_success('Database ready!');
}

function create_canbank_db() {
    $mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);
    if ($mysqli->connect_error) { json_error(401, $mysqli->connect_error); }
define(DB_NAME, '');
    $mysqli->query('CREATE DATABASE IF NOT EXISTS `'.DB_NAME.'` CHARACTER SET utf8 COLLATE utf8_unicode_ci');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->select_db(DB_NAME);
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_bank` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
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
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_type` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
`name` varchar(250),
`diameter` int,
`height` int,
`volume` double,
`volumeFlOz` int,
`default` tinyint
)');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_material` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
`name` varchar(100),
`abbr` varchar(3),
`color` varchar(50),
`default` tinyint
)');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_surface` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
`name` varchar(100),
`color` varchar(50),
`default` tinyint
)');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_color` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
`name` varchar(100),
`color` varchar(50),
`default` tinyint
)');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_content` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
`name` varchar(100),
`default` tinyint
)');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_country` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
`name` varchar(100),
`abbr` varchar(3),
`default` tinyint
)');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->query('CREATE TABLE IF NOT EXISTS `can_language` (
`id` int primary key auto_increment not null,
`tstamp` timestamp,
`name` varchar(100),
`abbr` varchar(3),
`default` tinyint
)');
    if ($mysqli->error) { json_error(500, $mysqli->error); }

    $mysqli->close();
    json_success('');
}
