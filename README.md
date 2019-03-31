# icecoldnugrape.com

## Development
```
npm install
npm start # localhost:8080
```

## Deployment
Altogether, there are three locations on the server used:
* `~/icecoldnugrape` - GitHub clone location
* `~/media` - "Downloads" drop-zone location
* `/etc/apache2/sites-available/000-default.conf` - reverse-proxy config

Two NodeJS server processes are used:
1. Serve the web application
```
npm run build-prod
npm serve # runs on port 3000
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

## Data
src/recordings_raw.json fields:
* `n` -> number
* `s` -> section

