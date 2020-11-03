import * as cron from 'cron'
import { formatDate } from '../utils/date'

class Agendamento {

    tarefas: any[] = []
    io: any
    private CronJOB: any
    
    getCurDate: any
    

    constructor(  ){
        
        this.CronJOB = cron.CronJob
    }

     setRealtime(socket){
        this.io = socket
    }

    configurarExpiracao( dados: any ){
        
        let data = new Date( Date.parse( dados.data ) ).toLocaleString('pt-BR', {
            timeZone: 'America/Manaus'
        })
        /*
        Preparar para zerar carrinho tempo expirado
        */
        let separarHora = data.split(' ')
        let horaFuturaParaZerar = this.addMinutes(separarHora[1], 60)
        let horaPararZerarcarinho = horaFuturaParaZerar.split(':')
        this.tarefas.push( {id: dados.email, hora: horaFuturaParaZerar} )
        
        
        let configurarTempo = `${horaPararZerarcarinho[2]} ${horaPararZerarcarinho[1]} ${horaPararZerarcarinho[0]} * * *`
        
        const agenda = new this.CronJOB( configurarTempo ,  () =>{
            let _curDate = new Date()
            let curDate = formatDate( _curDate ).split(' ')
            console.log('**************************************************************')
            console.log('*                                                            *')
            console.log(`*   Avisar token expirado  ${curDate}              *`)
            console.log('*                                                            *')
            console.log('**************************************************************')            
            
            let listaEmails = this.tarefas.filter( t => t.hora == curDate[1])
            
            this.avisoTokenExpirado( listaEmails )

            
        }, null, true, 'America/Manaus')
        
    }

    addMinutes(time: string, minsToAdd: number){
        var piece: any = time.split(':');
        

        var mins = piece[0]*60 + +piece[1] + +minsToAdd;
        
        const D = (J) => { return (J<10? '0':'') + J};
        //return D(mins%(24*60)/60 | 0) + ':' + D(mins%60) +":00"; 
        return D(mins%(24*60)/60 | 0) +':'+ D(mins%60) +':'+ piece[2] 
    }

    

    avisoTokenExpirado(tokens: any[]){
         tokens.forEach( e =>{
             this.io.emit( 'expired',e )
         })
    }

}

export default new Agendamento