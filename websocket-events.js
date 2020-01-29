#!/usr/bin/env node

const WebSocket = require("ws")
const Plugin = require('clightningjs');
const plugin = new Plugin();
let broadcast

plugin.onInit = (params) => {
  const port = params.options['websocket-port']
  let eventList = params.options['websocket-events']

  if(!eventList || eventList === "all"){
    eventList = EVENTS
  } else{
    eventList = eventList.split(",")
  }

  broadcast = (params)=>{
    const evName = Object.keys(params)[0]
    plugin.log(evName)
    if(!eventList.includes(evName)) return

    wss.clients.forEach(function each(client) {
      plugin.log('client')
      if (client !== wss && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(params))
      }
    })
  }

  const wss = new WebSocket.Server({ port })
  wss.on("connection",()=>{
    plugin.log("new websocket connection")
  })

  wss.on("error",(err)=>{
    plugin.log("Websocket error")
    plugin.log(err)
  })

};


const EVENTS = [
  'channel_opened',
  'connect',
  'disconnect',
  'invoice_payment',
  'warning',
  'forward_event',
  'sendpay_success',
  'sendpay_failure'  
]

EVENTS.map((ev)=>{
  plugin.log(ev)

  plugin.subscribe(ev);
  plugin.notifications[ev].on(ev, (params) => {
    if(broadcast){
      broadcast(params)
    }
  });
})

plugin.addOption('websocket-port', '8080', 'Websocket port for notifications', 'string');
plugin.addOption('websocket-events', 'all', 'List of events to broadcast. (Default: broadcast everything)', 'string');
plugin.start();
