////////////////////////////////////////////
class tabla{
	/*
	En los return
	10->es un error, el ultimo numero es la tabla la primaria es 0 la foranea es 1
	20->es ok el ultimo numero es la tabla la primaria es 0 la foranea es 1
	*/
	constructor(){
		this.data=[]
	}
	set(obj,kp,tabla=null,kf=null,objf=null,id=null){
	/*
		(*) obj:Es el obj q se va a pushear
		(*) kp:llave primaria 
		tabla:es la tabla a la q se conecta nuestro onjeto
		kf:llave foranea a la q apunta o se almacena la (kp)
		objf:es el obj foraneo q se va apushear en caso de q se resiva uno
		id:llave primaria el la tabla foranea

	*/
		if(this.inTabla(kp,obj[kp])<0){
			if(tabla && kf && id && objf){//Relacion con tabla
				obj.foranea={
					id:id,
					valf:objf[id]
				} //Todos los obj deben tener una propiedad "foranea:null"
				this.data.push(obj)
				let fila=tabla.inTabla(id,objf[id])//#busca las salas
				if(fila>-1){//si la tabla foranea exite
					if(tabla.data[fila][kf].indexOf(obj[kp])>-1){//#busca al player en la foranea
						return 101;//mi llave primaria esta en la tabla foranea
					}else{
						try{
							tabla.data[fila][kf].push(obj[kp])
						}catch(e){
							tabla.data[fila][kf]=(obj[kp])
						}
						return 201;//se agrego la relacion
					}
				}else{
					try{
						objf[kf].push(obj[kp])//#agrego el player
					}catch(e){
						objf[kf]=(obj[kp])//#agrego el player
					}
					let res=tabla.set(objf,id)//seteo la tabla
					if(res==100)return 101//esta en la tabla foranea
					return 201//se agrego la relacion
				}
			}else{
				this.data.push(obj)
			}
			return 200//ok
		}else{
			return 100//esta en la tabla
		}
	}
	inTabla(kp,val){//intabla("player","oscar")
		for (let i=0;i<this.data.length; i++) {
			if(this.data[i][kp]==val)return i
		}
		return -1
	}
	remove(kp,val,tabla=null){
		let p=this.inTabla(kp,val)
		if(tabla!=null){
			let {id,valf}=this.data[p].foranea
			let s=tabla.inTabla(id,valf)
			tabla.data[s].players.splice(tabla.data[s].players.indexOf(val),1)//lo elimino de su sala
		}
		this.data.splice(p,1)//elimino el jugador q se desconecte
	}
	
}
////////////////////////////////////////////
module.exports=tabla
////////////////////////////////////////////