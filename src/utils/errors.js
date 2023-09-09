export class ValidationError extends Error{
    constructor(status,massage){
        super()
        this.name = "ValidationError" 
        this.status = status 
        this.massage = massage
    }

}
export class InternalServerError extends Error{
    constructor(status,massage){
        super()
        this.name = "InternalServerError" 
        this.status = status
        this.massage = massage
    }

}
export class AuthorizationError extends Error{
    constructor(status,massage){
        super()
        this.name = 'AuthorizationError'
        this.massage = massage 
        this.status = status
    }
}