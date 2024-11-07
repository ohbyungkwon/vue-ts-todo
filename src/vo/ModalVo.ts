export class ModalVo {
    public code:number = 500;
    public status:string = "error";
    public title:string = "오류";
    public content:string = "알 수 없는 오류가 발생했습니다.";
    public btnMsg:string = "닫기";
    public callback?:() => any | undefined;
    constructor(data:any) {
        if(!data) return;

        // code가 우선순위를 갖고 code를 정의하지 않으면 status를 확인
        if(data.code) {
            this.code = data.code;
            const type:number = Math.floor(this.code / 100);
            if(type === 2) 
                this.status = 'notice';
            else if(type === 4)
                this.status = 'error';
            else if(type === 5)
                this.status = 'error';
            else 
                this.status = 'notice';
        } else {
            this.code = 0;
            if(data.status) this.status = data.status;
        }
        if(data.title) this.title = data.title;
        if(data.content) this.content = data.content;
        if(data.btnMsg) this.btnMsg = data.btnMsg;

        if(data.callback) this.callback = data.callback;
        else this.callback = undefined;
    }
}
  