export class TodoVo {
    public text:string = "";
    public done:Boolean = false;
  
    constructor(data:any) {
      this.text = data.text;
      this.done = data.done;
    }
  }
  