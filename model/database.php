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
				echo ('OK');
			} catch (PDOException $e) {
				$this->error = $e->getMessage();
				echo $this->error;
			}
		}
	}