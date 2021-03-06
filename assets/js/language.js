(function ($) {

window.LANGUAGE = {
    KOREAN: {
        popTit : '공지',
        popMsg : `<div style="text-align: left; font-size: 15px">ARK Invest Active ETF의 모든 종목의 거래정보를 지금 바로 확인하세요!</br></br>
 * <b>ARKer</b>는 ARK Invest 공식 홈페이지(ark-invest.com)에서 제공하는 거래내역을 기반으로합니다.</br>
 * <span style="color: red"><b>ARKer</b>는 매수 혹은 매도를 권유하지 않으며,</span> 단순히 ARK Invest에서 운용하는 ETF에 포함된 개별종목들의 거래내역을 정리하여 제공합니다.</br>
 * 대한민국 시간 기준으로 <b>매일 오전 9시 30분 또는 오후 12시 30분</b>에 거래내역이 갱신됩니다. (휴장일 제외)</br></div>`,
        noResult: "검색결과가 없습니다.",
        btnBasic : '기본정보',
        btnChange : '변화량정보'
    },
    ENGLISH: {
        popTit : 'Notice',
        popMsg : `<div style="text-align: left; font-size: 15px">Check the trading history of all stocks of ARK Invest Active ETF right now!</br></br>
 * <b>ARKer</b> is based on trading information provided by ARK Invest’s official website (ark-invest.com).</br>
 * <span style="color: red"><b>ARKer</b> does not recommend buying or selling,</span> but simply summarizes and provides trading information of individual stocks included in ETFs managed by ARK Invest.</br>
 * Trading information is updated <b>at 00:30 or 03:30 UTC.</b> (Excluding holidays)</br></div>`,
        noResult: "No Result",
        btnBasic : 'basic info',
        btnChange : 'change info'

    },
    CHINESE: {
        popTit : '注意',
        popMsg : `<div style="text-align: left; font-size: 15px">立即查看 ARK Invest Active ETF 所有股票的交易历史！</br></br>
* <b>ARKer</b>基于ARK Invest官方网站（ark-invest.com）上提供的交易详细信息。</br>
* <span style="color: red"><b>ARKer</b>不建议买卖，</span>而仅提供由ARK Invest管理的ETF中包含的单个股票的交易详细信息的摘要。</br>
* 交易详细信息将在<b>世界标准时间00:30或03:30更新。</b> （节假日除外）</br></div>`,
        noResult: "没有结果",
        btnBasic : '기본정보',
        btnChange : '변화량정보'
    }
}
window.arker_lan = LANGUAGE.ENGLISH;

})(window.jQuery);
