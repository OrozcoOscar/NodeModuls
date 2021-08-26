class server{
	constructor(port,ruta){
		this.express=require("express")
		this.app=this.express()
		this.server;
		if(this.app){
			this.server = require("http").Server(this.app)
			//seting
			this.app.set("port",process.env.PORT || port)
			/// directorio de la pag
			this.app.use(this.express.static(ruta))
			//start server
			this.server.listen(this.app.get("port"),()=>{
				console.log("Server on port",this.app.get("port"))
			})
			return this.server
		}else{
			console.error("SE REQUIEREN LOS MODULOS <<express>>,<<path>>,<<http>>")
		}
		
	}
}
////////////////////////////////////////////
module.exports=server
////////////////////////////////////////////
