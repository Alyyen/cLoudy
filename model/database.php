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

		function new_post($title, $content, $id_category) {
			$sql = "INSERT INTO topic (title, content, release_date, id_category) VALUES ('$title','$content', CURRENT_TIMESTAMP,'$id_category')";
			$this->dbHandler->exec($sql);
		}

		function get_topics_by_idcategory($id_category) {
			$sql = "SELECT * FROM topic WHERE id_category LIKE '$id_category'";
			//$this->dbHandler->exec($sql);
		}
	}