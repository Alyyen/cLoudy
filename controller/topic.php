<?php
	require_once('../model/database.php');
	require_once('../model/configuration.php');

	switch($_POST['action']){
		case 'new-post':
			$object = new Database();
			$title = $_POST['data']['new-post-title'];
			$content = $_POST['data']['new-post-content'];
			$id_category = $_POST['data']['new-post-category'];
			$new_post = $object->new_post($title, $content, $id_category);
			break;
		case 'topic-list':
			echo 'topic list';
			break;
		case 'topic-details':
			echo 'topic details';
			break;
		default:
			break;
	}
