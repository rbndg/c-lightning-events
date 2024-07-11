#!/usr/bin/env node

const WebSocket = require('ws')
const Plugin = require('clightningjs')
const plugin = new Plugin()
let broadcast

plugin.onInit = (params) => {
  const port = params.options['websocket-port']
  let eventList = params.options['websocket-events']

  if (!eventList || eventList === 'all') {
    eventList = EVENTS
  } else {
    eventList = eventList.split(',')
  }

  broadcast = (params) => {
    const evName = Object.keys(params)[0]
    if (!eventList.includes(evName)) return

    wss.clients.forEach(function each (client) {
      if (client !== wss && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(params))
      }
    })
  }

  const wss = new WebSocket.Server({ port })
  wss.on('connection', () => {
    plugin.log('new websocket connection')
  })

  wss.on('error', (err) => {
    plugin.log('Websocket error')
    plugin.log(err)
  })
}

const EVENTS = [
  'channel_opened',
  'channel_open_failed',
  'channel_state_changed',
  'connect',
  'disconnect',
  'custommsg',
  'invoice_payment',
  'invoice_creation',
  'warning',
  'forward_event',
  'sendpay_success',
  'sendpay_failure',
  'coin_movement',
  'balance_snapshot',
  'block_added',
  'openchannel_peer_sigs',
  'shutdown',
]

EVENTS.map((ev) => {
  plugin.subscribe(ev)
  plugin.notifications[ev].on(ev, (params) => {
    if (broadcast) {
      broadcast(params)
    }
  })
})

plugin.addOption('websocket-port', '8080', 'Websocket port for notifications', 'string')
plugin.addOption('websocket-events', 'all', 'List of events to broadcast. (Default: broadcast everything)', 'string')
plugin.start()
