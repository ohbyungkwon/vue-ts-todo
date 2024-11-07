export class UserInfoVo {
    public userId:string = "";
    public name:string = "";
    public email:string = "";
    public birth:string = "";
    public age:number = 0;
    public address:string = "";
    public gender:string = "";
    public role:string = "";

    constructor(data:any) {
        this.userId = data.userId;
        this.name = data.name;
        this.email = data.email;
        this.birth = data.birth;
        this.age = data.age;
        this.address = data.address;
        this.gender = data.gender;
        this.role = data.role;
    }
}