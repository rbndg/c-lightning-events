# C-Lightning Events

Subscribe to C-Lightning events with websocket

### How to run

Add the following config to your C-Lightning config file

1) git clone this repo
2) `npm install .`
3) Update C-lightinng config
```
plugin=/path/to/websocket-events.js
websocket-events=all // Comma seperated list of event types you want to broadcasted
websocket-port=8080 //Websocket port
```


#### Further Reading
[List of C-Lightning events](https://lightning.readthedocs.io/PLUGINS.html#event-notifications)