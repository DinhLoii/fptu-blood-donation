<?php
header('Content-Type: application/json');

// Kết nối với file donors.txt hoặc cơ sở dữ liệu
$donorsFile = 'donors.txt';
$data = [];

// Xử lý form liên hệ
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'contact') {
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

        if ($name && $email && $message) {
            $contactData = "Name: $name, Email: $email, Message: $message, Date: " . date('Y-m-d H:i:s') . "\n";
            file_put_contents('contacts.txt', $contactData, FILE_APPEND | LOCK_EX);
            echo json_encode(['success' => true, 'message' => 'Thank you for your message! We’ll get back to you soon.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid input. Please try again.']);
        }
    } elseif ($_POST['action'] === 'donate') {
        // Lưu thông tin người hiến (giả lập)
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $location = filter_var($_POST['location'], FILTER_SANITIZE_STRING);

        if ($name && $email && $location) {
            $donorData = json_decode(file_get_contents($donorsFile) ?: '[]', true) ?: [];
            $donor = [
                'name' => $name,
                'email' => $email,
                'location' => $location,
                'date' => date('Y-m-d H:i:s')
            ];
            $donorData[] = $donor;
            file_put_contents($donorsFile, json_encode($donorData, JSON_PRETTY_PRINT));
            echo json_encode(['success' => true, 'message' => 'Thank you for registering as a donor!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid donor information. Please try again.']);
        }
    }
    exit;
}

// Lấy danh sách người hiến (nếu cần hiển thị)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getDonors') {
    $donors = file_get_contents($donorsFile) ?: '[]';
    echo $donors;
    exit;
}
?>