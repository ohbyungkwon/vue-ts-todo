export class UserInfoVo {
    public userId:string = "";
    public username:string = "";
    public address:string = "";
    public zipCode:string = "";
    public phone:string = "";
    public gender:string = "";

    constructor(data:any) {
        this.userId = data.userId;
        this.username = data.username;
        this.address = data.address;
        this.zipCode = data.zipCode;
        this.phone = data.phone;
        this.gender = data.gender;
    }
}