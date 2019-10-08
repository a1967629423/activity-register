import { Service, Ticket, Seat, TicketPost, ErrorPost, InterfaceGet, TicketModule } from './ServiceType'
function setTimeoutAsync(timeout: number) {
    return new Promise<void>(res => {
        setTimeout(() => res(), timeout)
    })
}
var id = 0;
function generateFakeTicket(title: string, description: string, remainingQuantity: number, price: number, modules?: TicketModule[]): Ticket {
    return {
        id: id++,
        title,
        description,
        price,
        type: modules ? '' : '',
        modules: modules ? modules : [],
        remainingQuantity
    }
}
function generateFakeSeat():Seat[][]{
    let seats:Seat[][] = [];
    for(let i =0;i<6;i++){
        let layer:Seat[] = [];
        for(let j =0;j<6;j++){
            let rand = Math.random();
            let status = rand>0.3?'enable':rand>0.2?'used':rand>0.1?'disable':'used';
            let seat:Seat = {
                position:{
                    x:i,y:j
                },
                status,
            }
            layer.push(seat);
        }
        seats.push(layer);
    }
    return seats;
}
export class FakeService implements Service {
    async getTickets(): Promise<Ticket[]> {
        await setTimeoutAsync(1000);
        return [
            generateFakeTicket('远程支持票', '可获得活动 PPT 等资料', 25, 9.99),
            generateFakeTicket('标准票', '可获得活动现场参加活动的机会', 25, 0.99),
            generateFakeTicket('赞助商', '将获得品牌露出的机会详情联系qq111111111', 2, 9.99, [{
                id: 0,
                title: '参与者信息',
                questionList: [
                    {
                        id: 0,
                        title: '姓名',
                        description: '请输入您的真实姓名',
                        type: 'text',
                        answerList: []
                    },
                    {
                        id:0,
                        title:'身份证号',
                        type:'text',
                        description:'由于现场安保需要,请输入您的身份证号',
                        answerList:[]
                    }
                    
                ],

            }])
        ];
    }
    async getSeats(ticket:Ticket): Promise<Seat[][]> {
        await setTimeoutAsync(500);
        return generateFakeSeat();
    }
    async postInfo(info: TicketPost): Promise<InterfaceGet> {
        await setTimeoutAsync(200);
        return {
            success: true,
            data: {}
        }
    }
    async postError(errorInfo: ErrorPost): Promise<InterfaceGet> {
        console.warn(`has a error:${errorInfo.message} \nenv:${errorInfo.env}`);
        await setTimeoutAsync(200);
        return {
            success: true,
            data: {}
        }
    }
}