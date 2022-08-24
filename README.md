# icecoldnugrape.com

## Development
```
yarn
yarn dev # localhost:3000
```

## Deployment
Altogether, there are three locations on the server used:
* `~/icecoldnugrape` - GitHub clone location
* `~/media` - "Downloads" drop-zone location
* `/etc/apache2/sites-available/000-default.conf` - reverse-proxy config

Two NodeJS server processes are used:
1. Serve the web application
```
yarn build
cd out
ws --port 3000
```
2. Serve the "Downloads" content
```
npm install --global local-web-server
cd ~/media
ws --port 3001
```

### Apache
Install modules:
`sudo a2enmod proxy proxy_http`

Edit `/etc/apache2/sites-available/000-default.conf`.

Place the following at the very end of the `VirtualHost` tag:
```
>   ProxyPass     /media/     http://localhost:3001/
>   ProxyPass     /     http://localhost:3000/
```

