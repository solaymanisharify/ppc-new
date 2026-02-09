<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    
    $filename = "email_list.txt";

    if (!empty($email)) {
        if (file_exists($filename)) {
            $existingContent = file_get_contents($filename);
        } else {
            $existingContent = "";
        }

        $updatedContent = $existingContent . "$email,";

        if (file_put_contents($filename, $updatedContent, LOCK_EX) !== false) {
            echo "Email has been successfully added.";
        } else {
            echo "An error occurred while adding email.";
        }
    } else {
        echo "Email is empty.";
    }
}
