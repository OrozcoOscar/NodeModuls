class emit{
	constructor(io){
		this.io=io
	}
	 mi(cliente,event,data){//emite al mismo cliente q hace la peticion
		cliente.emit(event,data)
	}
	todos(event,data){//emite a todos los q esten en el server
		this.io.sockets.emit(event,data)
	}
	 a(idCliente,event,data){//emite a un cliente en espesifico
		this.io.sockets.to(idCliente).emit(event,data)		
	}
	 todos_en(sala,event,data){//emite a todos los q esten en un canal(sala)
		this.io.sockets.in(sala).emit(event,data)
	}
	 todos_exceptuandome(cliente,event,data){//emite a todos en el server menos al q hace la peticion
		cliente.broadcast.emit(event,data)
	}
	todos_exceptuandome_en(cliente,sala,event,data){//emite a todos en el server menos al q hace la peticion en un canal(sala)
		cliente.broadcast.to(sala).emit(event,data)
	}
}
////////////////////////////////////////////
module.exports=emit
////////////////////////////////////////////