<?php
	require_once('../model/database.php');
	require_once('../model/configuration.php');

	$topics_array = [];
	$object = new Database();
	$id_category = $_POST['data'];
	
	// GET DATAS FROM DATABASE
	$list_all_topics = $object->get_topics_by_idcategory($id_category);

	// RETURN DATAS AS JSON
	if ($list_all_topics != NULL) {
		echo json_encode(array("status" => 'Success', "id_category" => $id_category,
			"datas" => $list_all_topics));
	} else {
		header("HTTP/1.0 404 Not Found");
		die(json_encode(array("status" => 'error')));
	}

