class LocalStorageUtil {
    static autoKey:string = localStorage.length.toString();
    
    static setItem(key:any, value:any): void {
        let item:any = null;
        if(value instanceof Object) {
            item = JSON.stringify(value);
        } else {
            item = value.toString();
        }

        localStorage.setItem(LocalStorageUtil.convertString(key), item);            
    }

    static getItem(key:any): any {
        const keyStr = LocalStorageUtil.convertString(key);
        const item:any = localStorage.getItem(keyStr);

        try{
            return JSON.parse(item);
        } catch(e) {
            return item;            
        }
    }

    static removeItem(key:any): void{
        localStorage.removeItem(LocalStorageUtil.convertString(key));
    }

    static changeItem(key:any, value:any): void {
        LocalStorageUtil.removeItem(key);
        LocalStorageUtil.setItem(key, value);
    }

    static clear(): void{
        localStorage.clear();
    }

    static convertString(value:any): string{
        return value.toString();
    }

    static searchAll():any[] {
        const list = [];
        const size = localStorage.length;
        for(let i = 0; i < size; i++) {
            const key = localStorage.key(i);
            if(key === null) {
                alert('조회 중 문제가 발생했습니다.');
                break;
            }

            const item = LocalStorageUtil.getItem(key);
            list.push(item);
        }
        return list;
    }
}
export default LocalStorageUtil;
