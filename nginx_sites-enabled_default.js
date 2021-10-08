proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g
                 inactive=60m use_temp_path=off;
upstream sdcgroup {
  least_conn;
  keepalive 500;
  server 3.142.84.29;
  #server <another instances public ip>:<your api port>;
  # queue 100 timeout=100; # you may have to delete this line for it to work
}
server {
  listen 80 backlog=4096;
  gzip on;
  location /qa/questions {
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_pass http://sdcgroup;
    proxy_cache my_cache;
    proxy_cache_valid any 10m;
    add_header X-Cache-Status $upstream_cache_status;
  }
    location /loaderio-859c315145409426de48e3b81388657c {
    return 200 'loaderio-859c315145409426de48e3b81388657c';
  }
}




{/*
//sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
//ssh -i "Zuko7.cer" ubuntu@ec2-18-117-85-48.us-east-2.compute.amazonaws.co
//sudo vim /etc/nginx/sites-enabled/default
//sudo vim service nginx reload
//sudo nginx -t
//sudo systemctl restart nginx
*/}