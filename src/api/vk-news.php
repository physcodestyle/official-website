<?php

$token = file_get_contents('../.vk-token');
$params = array(
	'v' => '5.126',
	'access_token' => $token,
	'owner_id' => -131429,
	'offset' => isset($_GET['offset']) ? $_GET['offset'] : 0,
	'count' => isset($_GET['count']) ? $_GET['count'] : 10,
	'filter' => 'owner'
);
$content = file_get_contents('https://api.vk.com/method/wall.get?' . http_build_query($params));
if (!$content) {
	$error = error_get_last();
	throw new Exception('HTTP request failed. Error: ' . $error['message']);
}
$response = json_decode($content);
if (isset($response->error)) {
	throw new Exception('Error: ' . $response->error . '.\n\n Error description: ' . $response->error_description);
}
echo($content);
