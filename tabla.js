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
		tabla:es la tabla a la q se conecta nuestro objeto
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
	inForanea(val,e=false){//retorna un array
		let res=this.data.map((r,i)=>(r.foranea.valf===val)?r:-1)

		if(res=="")return (e)?null:-1
		if(e){
			res=res.filter(r=>!Number(r))
			if(res=="")return null
			else if(res.length>1)return res
			else return res[0]	
		}else{
			res = res.map((r,i)=>{
				if(!Number(r))return i
				else return -1
			})
			res=res.filter(r=>r!=-1)
			if(res=="")return -1
			else if(res.length>1)return res
			else return res[0]
		}
	}
	inTabla(kp,val,e=false){//intabla("player","oscar") retorna un array el tercer para metri tru si desea optener todo el obj false si solo desea la posicion
		let res=this.data.map((r,i)=>(r[kp]==val)?r:-1)
		if(res=="")return (e)?null:-1
		if(e){
			 res = res.filter(r=>!Number(r))
			if(res=="")return null
			else if(res.length>1)return res
			else return res[0]			 
		}else{
			
			res = res.map((r,i)=>{
				if(!Number(r))return i
				else return -1
			})
			res=res.filter(r=>r!=-1)
			if(res=="")return -1
			else if(res.length>1)return res
			else return res[0]
		}
	}
	remove(kp,val,tabla=null){
		let p=this.inTabla(kp,val)
		if(p>-1){
			if(tabla!=null){
				let {id,valf}=this.data[p].foranea
				let s=tabla.inTabla(id,valf,true)
				s.players.splice(s.players.indexOf(val),1)//lo elimino de su sala
			}
			this.data.splice(p,1)//elimino el jugador q se desconecte
		}
		
	}
	
}
////////////////////////////////////////////
module.exports=tabla
////////////////////////////////////////////
