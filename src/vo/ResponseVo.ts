export class ResponseVo {
    public status:string = "";
    public message:string = "";
    public code:number = 200;
  
    constructor(data:any) {
      this.status = data.status;
      this.message = data.message;
      this.code = data.code;
    }
  }
  