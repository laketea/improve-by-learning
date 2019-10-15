/**
 * Created by 61020 on 2018/2/6.
 */
var serverUrl = 'http://192.168.0.151/';
var lang = window.sessionStorage.getItem("lang")==null?"CN":window.sessionStorage.getItem("lang");
var LANG_TEXT = 'CN';
var singlePage = '/lte/html/singleInst.html';
var multiPage = '/lte/html/multiInst.html';
var helpPage = '/lte/html/help.html';

var SUBMIT_TEXT = getLangStr('STR_SUBMITTING_DATA');
var LODING_TEXT = getLangStr("STR_LOADING_DATA");
