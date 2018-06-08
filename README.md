# icecoldnugrape.com
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Deploy
Altogether, there are three locations on the server used:
* `~/icecoldnugrape` - GitHub clone location
* `~/media` - "Downloads" drop-zone location
* `/etc/apache2/sites-available/000-default.conf` - reverse-proxy config

Two NodeJS server processes are used:
1. Serve the web app content
```
npm start # runs on port 3000
```
2. Serve the "Downloads" content
```
npm install --global serve
serve -l 3001 ~/media
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

