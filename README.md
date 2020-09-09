| :warning: The online version has been disabled since this project is now archived |
| --- |

# mv-translate

MV-translate is a translation-webapp I created as the solution to a programming test for a job interview.

## Production

A running version can be found [here](https://mv-translate.verwimp.me/).

### Infrastructure

There are multiple ways to run this application in production. Ranging for non-scalable to fully scallable.
The application can be scaled horizontally, since everypart of the application is stateless. But this is not required.
The demo version found [here](https://mv-translate.verwimp.me/) runs on a VPS with nginx serving as webserver and reverse proxy.

Nginx configuration

```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate         /etc/ssl/cert.pem;
    ssl_certificate_key     /etc/ssl/key.pem;
    ssl_client_certificate /etc/ssl/cloudflare.crt;
    ssl_verify_client on;

    root /var/www/mv-translate/front;
    index index.html;

    server_name mv-translate.verwimp.me;

    location /api {
            proxy_pass http://localhost:5000/api;

    }

    location / {
            try_files $uri $uri/ =404;
    }
}
```
Note: The domain is managed with Cloudflare and they provide server and client ssl certificates. This means that the server doesn't only have a secure connection to the user of the webapp, but also the communication between Cloudflare and the VPS is secure. (Any requests not signed by Cloudflare are refused.)

The easiest way to deploy the application in a scalable manner would be to run multiple instances of the front-end and back-end, and loadbalance requests between them. (This can be done with containers as well as with simple webservers)
