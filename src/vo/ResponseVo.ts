export class ResponseVo<T = any> {
  public code:number = 200;
  public resultMsg:string = "";
  public resultObj?:T = undefined;
    
  constructor(data:any) {
    this.code = data.code;
    this.resultMsg = data.resultMsg;
    this.resultObj = data.resultObj;
  }
}
  