/** 유틸리티 클래스입니다.
 * 
 * @member emialRegex 는 word \@ word . word 의 형태를 찾아냅니다.
 * 
 * @constructor 생성자 호출 시, Error 를 발생시킵니다.
 */
export class RegexUtility {

    static emailRegex: RegExp = /(.+)@(.+)\.(.+)/g;

    constructor () { throw new Error('Regex Utility is uiltiy class. Can\'t use constructor'); }

}