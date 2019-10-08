import Joi, { TypeOf } from '../plugins/joiType';
type SuccessedGet = {
    success:true,
    data:any
}
type FailedGet = {
    success:false,
    message:any,
    code:number
}
export type InterfaceGet = SuccessedGet|FailedGet
export interface Service {
    getTickets():Promise<Ticket[]>
    getSeats(ticket:Ticket):Promise<Seat[][]>
    postInfo(info:TicketPost):Promise<InterfaceGet>
    postError(errorInfo:any):Promise<InterfaceGet>
}
var TicketQuestionSchema = Joi.object({
    id:Joi.number().required(),
    type:Joi.string().valid('select','text').required(),
    title:Joi.string().required(),
    description:Joi.string().required(),
    answerList:Joi.when(Joi.ref('type'),{is:'select',then:Joi.array().items('string')})
})
var TicketModuleSchema = Joi.object({
    id:Joi.number().required(),
    title:Joi.string().required(),
    questionList:Joi.array().items(TicketQuestionSchema).required()
})
var TicketSchema = Joi.object({
    id:Joi.number().required(),
    title:Joi.string().required(),
    description:Joi.string().required(),
    remainingQuantity:Joi.number().min(0).required(),
    price:Joi.number().min(0).required(),
    type:Joi.string().valid('normal','moreinfo').default('normal'),
    modules:Joi.when(Joi.ref('type'),{is:'moreinfo',then:Joi.array().items(TicketModuleSchema).required()})
})
var TicketPostInfoQuestionSchema = Joi.object({
    id:Joi.number().required(),
    answer:Joi.string().required()
})
var TicketPostInfoModuleSchema = Joi.object({
    id:Joi.number().required(),
    questionList:Joi.array().items(TicketPostInfoQuestionSchema)
})
var TicketPostInfoSchema = Joi.object({
    id:Joi.number().required(),
    type:Joi.string().valid('normal','moreinfo').default('normal'),
    infos:Joi.when(Joi.ref('type'),{is:'morinfo',then:Joi.array().items(TicketPostInfoModuleSchema).required()})
})
var ErrorPostSchema = Joi.object({
    message:Joi.string().required(),
    env:Joi.string()
})
var SeatInfoSchema = Joi.object({
    position:Joi.object({
        x:Joi.number().min(0).required(),
        y:Joi.number().min(0).required()
    }).required(),
    status:Joi.string().valid('enable','disable','lock','used').required()
})



export var Ticket = TicketSchema;
export type Ticket = TypeOf<typeof TicketSchema>

export var TicketModule = TicketModuleSchema;
export type TicketModule = TypeOf<typeof TicketModuleSchema>

export var Seat = SeatInfoSchema;
export type Seat = TypeOf<typeof SeatInfoSchema>

export var TicketPost = TicketPostInfoSchema;
export type TicketPost = TypeOf<typeof TicketPostInfoSchema>

export var ErrorPost = ErrorPostSchema;
export type ErrorPost = TypeOf<typeof ErrorPostSchema>