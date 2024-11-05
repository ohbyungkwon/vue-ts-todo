export class ResponseVo<T = any> {
  public code:number = 200;
  public status:string = "";
  public message:string = "";
  public body?:T = undefined;
    
  constructor(data:any) {
    this.code = data.code;
    this.status = data.status;
    this.message = data.message;
    this.body = data.body;
  }
}
  