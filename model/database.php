<?php

	class Database {
		private $dbHost = DB_HOST;
		private $dbUser = DB_USER;
		private $dbPass = DB_PASS;
		private $dbName = DB_NAME;
		private $dbHandler;
		private $error;

		// DATABASE CONNECTION
		function __construct() {
			$conn = 'mysql:host=' . $this->dbHost . ';dbname=' . $this->dbName;
			$options = array(
				PDO::ATTR_PERSISTENT => true,
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			);

			try {
				$this->dbHandler = new PDO($conn, $this->dbUser, $this->dbPass, $options);
			} catch (PDOException $e) {
				$this->error = $e->getMessage();
				echo $this->error;
			}
		}

		// ADD A POST
		function new_post($title, $content, $id_category) {
			$sql = "INSERT INTO topic (title, content, release_date, id_category) VALUES ('$title','$content', CURRENT_TIMESTAMP,'$id_category')";
			$this->dbHandler->exec($sql);
		}

		// GET POSTS BY CATEGORY
		function get_topics_by_idcategory($id_category) {
			$sql = "SELECT * FROM topic WHERE id_category LIKE '$id_category'";

			$datas = $this->dbHandler->query($sql);
			$datas->execute();
			$result = $datas->fetchAll(PDO::FETCH_ASSOC);

			if (empty($result)) {
				return NULL;
			} else {
				return $result;
			}
		}

		// GET LAST POSTS FOR HOMEPAGE
		function last_posts_for_homepage(){
			$sql = "SELECT * FROM topic JOIN category ON topic.id_category = category.id ORDER BY topic.id DESC LIMIT 4";

			$datas = $this->dbHandler->query($sql);
			$datas->execute();
			$result = $datas->fetchAll(PDO::FETCH_ASSOC);

			if (empty($result)) {
				return NULL;
			} else {
				return $result;
			}
		}

		// GET TOPIC DATAS BY TOPIC ID
		function get_topic_details_by_idtopic($id_topic){
			$sql = "SELECT * FROM topic JOIN category ON topic.id_category = category.id WHERE topic.id = '$id_topic'";

			$datas = $this->dbHandler->query($sql);
			$datas->execute();
			$result = $datas->fetchAll(PDO::FETCH_ASSOC);

			if (empty($result)) {
				return NULL;
			} else {
				return $result;
			}
		}

		// GET COMMENTS LINKED TO A TOPIC WITH ID TOPIC
		function get_comments_by_idtopic($id_topic) {
			$sql = "SELECT * FROM comment WHERE id_topic = '$id_topic' ORDER BY release_date DESC";

			$datas = $this->dbHandler->query($sql);
			$datas->execute();
			$result = $datas->fetchAll(PDO::FETCH_ASSOC);

			if (empty($result)) {
				return NULL;
			} else {
				return $result;
			}
		}

		// GET COMMENTS LINKED TO A TOPIC WITH ID TOPIC
		function new_comment_on_topic_by_id($id_topic, $content) {
			$sql = "INSERT INTO comment (id_topic, content, release_date) VALUES ('$id_topic','$content', CURRENT_TIMESTAMP)";
			$this->dbHandler->exec($sql);
		}
	}