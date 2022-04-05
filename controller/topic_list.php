<?php
	require_once('../model/database.php');
	require_once('../model/configuration.php');

	$object = new Database();
	$id_category = $_POST['data'];
	// GET DATAS FROM DATABASE
	$list_mobile_topics = $object->get_topics_by_idcategory($id_category);
	foreach ($list_mobile_topics as $topic){
		print_r($topic);
	}