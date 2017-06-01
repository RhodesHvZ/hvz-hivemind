# Socket.IO Design

## Basic protocol

Client has access to PayloadTypes:
`
  GET: {
    Users: {
      Count,
      Online,
      ...
    }
  }
`

### GET DATA
 From the client:
 `socket.emit('GET', <data>)`

 Where data looks like:
 `data : {
  clientid: <client-id>,
  type: <type>
 }`
 Whereas type can be: `<scope>.<attribute>`
 `type: {
  Users.Count
 }`

 A full example:
 `{ Users } = GET`
 `socket.emit(GET.Users.Count, {clientid: '123'})`
 return:
 `{ Event: 'SUCCESS', data: 56, type: 'Users.Count' }`

  `
    socket.on(SUCESS.Users.Count) {
      ...
    }

    socket.on(SUCESS) { from server: // io.socket.clientid.emit(SUCCESS, payload)
      if(type == Users.Count){
         ...
      }
    }
  `

 `socket.emit('GET', {clientid: '123', type 'Users.<username>.Email'})`
 return:
 `{ Event: '200',data: '123@blah.com', type: 'Users.mail' }`
 or on fail:
 `{ Event: '403' }`

 On success:
  `socket.on('200') (payload) => {
    if(payload.type === 'Users[<username>].Email') {
      email.value = payload.data
    }
  }
  socket.on('403') (payload) -> {
   error(403) // Permission Error: 403
  }`

### POST DATA

  From the client:
    `socket.emit('POST', {
      type: 'User.Update',
      email: 'foo@bar.com',
      'first name': 'foo',
      'last name': 'bar'
     })`
