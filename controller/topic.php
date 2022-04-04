<?php
	require_once('../model/database.php');
	require_once('../model/configuration.php');

	switch($_POST['action']){
		case 'new-post':
			echo 'new post';
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
