import { UserSort } from "../types/user.sort.enum";

/** UserModel 에 내장 문서의 형태로 저장됩니다.
 * 
 * @member _id MongoDB 가 만들어낸 _id 입니다.
 * 
 * @member sort 열거형으로 계정의 종류를 나타내고 있습니다.
 * 
 * @member username 문자열로 계정의 이름을 나타내고 있습니다.
 */
export default class {

    _id:string;
    sort:UserSort;
    username:string;

    constructor ({ _id, sort, username }) {

        this._id = _id;
        this.sort = sort;
        this.username = username;
        
    }
}