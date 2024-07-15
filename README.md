# C-Lightning Web Socket Events

Subscribe to C-Lightning events with websocket

### How to run

1) git clone this repo
2) `npm install .`
3) `chmod +x webseock-events.js`
4) Update C-lightinng config with the following:
```
plugin=/path/to/websocket-events.js
websocket-events=all // Comma seperated list of event types you want broadcasted
websocket-port=8080 //Websocket port
```


#### Further Reading
[List of Core-Lightning events](https://docs.corelightning.org/docs/event-notifications)
