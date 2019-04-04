const reconnectInterval = 1000
class RWS{
    constructor(){
        this.ws = null
    }
}
const rws = new RWS()
let ws

export function connect(url, store) {
    ws = new WebSocket(url)
    rws.ws = ws
    ws.onopen = function() {
        // eslint-disable-next-line
        console.log('open')
        store.commit('SOCKET_ONOPEN')
    }
    ws.onerror = function() {
        // eslint-disable-next-line
        console.log('error')
    }
    ws.onclose = function() {
        // eslint-disable-next-line
        console.log('close')
        store.commit('SOCKET_ONCLOSE')
        Object.values(deferreds).forEach(d => d.reject())
        deferreds = {}
        setTimeout(() => connect(url, store), reconnectInterval)
    }
    ws.onmessage = function(event) {
        const data = JSON.parse(event.data)
        // eslint-disable-next-line
        console.log('>>', data)
        if (data.msg === 'result') {
            const deferred = deferreds[data.id]
            deferred.resolve(data.result)
            delete deferreds[data.id]
        }else{
            store.commit('SOCKET_ONMESSAGE', data)
        }
    }
}

let id = 0
let subs = {}
let deferreds = {}

class Deferred{
    constructor() {
      this.promise = new Promise((resolve, reject)=> {
        this.reject = reject
        this.resolve = resolve
      })
    }
}

export const SDP_Mixin = {
    data: function(){
        return {
            subs_: []
        }
    },
    created(){
        this.rws = rws

    },
    beforeDestroy() {
        this.subs_.forEach(subId => {
            sendUnSub(this.rws.ws, subId)
        });
    },
    methods: {
        $subsReady(){
            const flags = this.subs_.every(x => this.$store.state.sdp.ready[x])
            return flags
        },
        $sub(name, filter, subId) {
            subId = subId || name
            if(!this.subs_.includes(subId)){
                this.subs_.push(subId)
            }
            sendUnSub(this.rws.ws, subId, this.$store.state.jwt)  
            subs[id] = {id: subId, filter}
            sendSub(this.rws.ws, subId, filter, this.$store.state.jwt)
        },
        $rpc(name, params){
            id += 1;
            const deferred = new Deferred()
            deferreds[id] = deferred
            sendRPC(this.rws.ws, name, id+'', params, this.$store.state.jwt)
            return deferred.promise
        }
    }
}

function send(socket, data) {
    socket.send(JSON.stringify(data))
  }

function sendSub (socket, subId, params, jwt) {
    const data = {msg: 'sub', id: subId, params: params, jwt}
    send(socket, data)
}

function sendUnSub (socket, subId, jwt) {
    const data = {msg: 'unsub', id: subId, jwt}
    send(socket, data)
}

function sendRPC (socket, name, RPCId, params, jwt) {
    const data = {msg: 'method', method: name, id: RPCId, params: params, jwt}
    send(socket, data)
}

export const moduleSocket = {
    state: {
        isConnected: false,
        reconnectError: false,
        subs: {},
        ready: {},
        error: ''
    },
    mutations: { 
      SOCKET_ONOPEN (state) {
        state.isConnected = true
      },
      SOCKET_ONCLOSE (state)  {
        state.isConnected = false
      },
      SOCKET_ONERROR (state, event)  {
        state.error = event
      },
      SOCKET_ONMESSAGE (state, data)  {
        if(data.msg === 'initializing'){
            state.subs = {...state.subs, [data.id]: []}
            state.ready = {...state.ready, [data.id]: false}
        }
        else if(data.msg === 'ready'){
            state.ready = {...state.ready, [data.id]: true}
        }
        else if (['added', 'changed', 'removed'].includes(data.msg)) {            
            //if(state.subs[data.id] === undefined)
            //    state.subs[data.id] = []
            const sub = state.subs[data.id]
            if (data.msg === 'added') {
                if(!sub.map(x => x.id).includes(data.doc.id))
                    state.subs = {...state.subs, [data.id]: [...sub, data.doc]}
            } else if (data.msg === 'changed') {
                const index = sub.findIndex(item => item.id === data.doc.id)
                const tmp = [
                    ...sub.slice(0, index),
                    data.doc,
                    ...sub.slice(index + 1)
                ]
                state.subs = {...state.subs, [data.id]: tmp}
            } else {                                
                const index = sub.findIndex(item => item.id === data.doc_id)
                if(index !== -1){
                    let tmp = [
                        ...sub.slice(0, index),
                        ...sub.slice(index + 1)
                    ]
                    state.subs = {...state.subs, [data.id]: tmp}                
                }
            }
        } else if (data.msg === 'error') { 
            state.error = data.error
        }
      }
    }
}
