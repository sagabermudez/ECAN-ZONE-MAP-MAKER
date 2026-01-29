<?php
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(['status' => 'error', 'message' => 'No data received']);
  exit;
}

$file = 'facilities_data.csv';
$headers = ['Facility Name', 'Category', 'Remarks', 'Owner', 'Sector', 'Municipality', 'Barangay', 'Latitude', 'Longitude'];

// Create file and add headers if not exist
if (!file_exists($file)) {
  $fp = fopen($file, 'w');
  fputcsv($fp, $headers);
} else {
  $fp = fopen($file, 'a');
}

fputcsv($fp, [
  $data['facilityName'],
  $data['category'],
  $data['remarks'],
  $data['ownerName'],
  $data['sector'],
  $data['municipality'],
  $data['barangay'],
  $data['latitude'],
  $data['longitude']
]);

fclose($fp);
echo json_encode(['status' => 'success']);
