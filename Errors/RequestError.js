export default class RequestError extends Error{
          constructor(message){
                    super(message);
                    this.status=400;
                    Error.captureStackTrace(this, this.constructor);
          }
}