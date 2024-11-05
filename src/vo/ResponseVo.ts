export class ResponseVo {
  public code:number = 200;
  public status:string = "";
  public message:string = "";
  public body?:Object = undefined;
    
  constructor(data:any) {
    this.code = data.code;
    this.status = data.status;
    this.message = data.message;
    this.body = data.body;
  }
}
  