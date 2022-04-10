<?php
	require_once('../model/database.php');
	require_once('../model/configuration.php');

	switch ($_POST['action']) {
		case 'new-post':
			$object = new Database();
			$title = $_POST['data']['new-post-title'];
			$content = $_POST['data']['new-post-content'];
			$id_category = $_POST['data']['new-post-category'];

			// REPLACE " & ' TO \" & \' IN TITLE AND CONTENT
			$content = str_replace("'", "\'", $content);
			$content = str_replace('"', '\"', $content);
			$content = substr($content, 0, 2500);
			$title = str_replace("'", "\'", $title);
			$title = str_replace('"', '\"', $title);
			$title = substr($title, 0, 100);

			// SEND DATAS TO DATABASE
			$new_post = $object->new_post($title, $content, $id_category);
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
		case 'topic-details':
			$object = new Database();
			$id_topic = $_POST['data'];

			// GET DATAS FROM DATABASE
			$topic_details = $object->get_topic_details_by_idtopic($id_topic);

			// RETURN DATAS AS JSON
			if ($topic_details != NULL) {
				echo json_encode(array("status" => 'Success', "datas" => $topic_details));
			} else {
				header("HTTP/1.0 404 Not Found");
				die(json_encode(array("status" => 'error')));
			}
			break;
		case 'topic-comments':
			$object = new Database();
			$id_topic = $_POST['data'];

			// GET COMMENTS BY ID TOPIC
			$topic_comments = $object->get_comments_by_idtopic($id_topic);

			// RETURN DATAS AS JSON
			if ($topic_comments != NULL) {
				echo json_encode(array("status" => 'Success', "datas" => $topic_comments));
			} else {
				header("HTTP/1.0 404 Not Found");
				die(json_encode(array("status" => 'error')));
			}
			break;
		case 'topic-new-comment':
			$object = new Database();
			$id_topic = $_POST['id_topic'];
			$content = $_POST['data']['new-comment-content'];

			// REPLACE " & ' TO \" & \' IN TITLE AND CONTENT
			$content = str_replace("'", "\'", $content);
			$content = str_replace('"', '\"', $content);
			$content = substr($content, 0, 1000);

			// SEND DATAS TO DATABASE
			$new_comment = $object->new_comment_on_topic_by_id($id_topic, $content);
			break;
		default:
			break;
	}
