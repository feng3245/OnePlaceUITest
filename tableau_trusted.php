<?php

function get_trusted_url($user,$server,$view_url) {
  $params = ':embed=yes&:toolbar=yes&:render=false';

  $ip = $_SERVER['REMOTE_ADDR'];

  $ticket = get_trusted_ticket($server, $user, $ip);

  if (strcmp($ticket, "-1") != 0) {
    $url = "http://$server/trusted/$ticket/$view_url?$params";
    if(isset($_GET['EntityUID']))
      $url .= '&EntityUid='.$_GET['EntityUID'];
    if(isset($_GET['PortfolioUID']))
      $url .= '&PortfolioUid='.$_GET['PortfolioUID'];
    return $url;
  } else {
    return 0;
  }
}

function get_trusted_ticket($wgserver, $user, $remote_addr) {
  $params = array(
    'username' => $user
  );
  $post = http_post_fields("http://$wgserver/trusted", $params);
  $data = http_parse_message($post);
  return $data->body;
}
