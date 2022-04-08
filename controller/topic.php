<?php
	require_once('../model/database.php');
	require_once('../model/configuration.php');

	switch($_POST['action']){
		case 'new-post':
			$object = new Database();
			$title = $_POST['data']['new-post-title'];
			$content = $_POST['data']['new-post-content'];
			$id_category = $_POST['data']['new-post-category'];
			// REPLACE " & ' TO \" & \' IN TITLE AND CONTENT
			$content = str_replace("'", "\'", $content);
			$content = str_replace('"', '\"', $content);
			$title = str_replace("'", "\'", $title);
			$title = str_replace('"', '\"', $title);
			// SEND DATAS TO DATABASE
			$new_post = $object->new_post($title, $content, $id_category);
			break;
		case 'topic-details':
			echo 'topic details';
			break;
		case 'last-four-posts':
			$object = new Database();

			// GET DATAS FROM DATABASE
			$list_last_topics = $object->last_posts_for_homepage();

			// RETURN DATAS AS JSON
			if ($list_last_topics != NULL) {
				echo json_encode(array("status" => 'Success', "datas" => $list_last_topics));
			} else {
				die(json_encode(array("status" => 'error')));
			}
			break;
		default:
			break;
	}
