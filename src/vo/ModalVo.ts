export class ModalVo {
    public status:string = "error";
    public title:string = "오류";
    public content:string = "알 수 없는 오류가 발생했습니다.";
    public btnMsg:string = "닫기";
 
    constructor(data:any) {
        if(!data) return;

        if(data.status !== undefined) this.status = data.status;
        if(data.title !== undefined) this.title = data.title;
        if(data.content !== undefined) this.content = data.content;
        if(data.btnMsg !== undefined) this.btnMsg = data.btnMsg;
    }
}
  