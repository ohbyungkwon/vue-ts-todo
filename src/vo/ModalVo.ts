export class ModalVo {
    public status:string = "error";
    public title:string = "오류";
    public content:string = "알 수 없는 오류가 발생했습니다.";
    public btnMsg:string = "닫기";
    public callback?:() => any | undefined;
    constructor(data:any) {
        if(!data) return;

        if(data.status) this.status = data.status;
        if(data.title) this.title = data.title;
        if(data.content) this.content = data.content;
        if(data.btnMsg) this.btnMsg = data.btnMsg;

        if(data.callback) this.callback = data.callback;
        else this.callback = undefined;
    }
}
  