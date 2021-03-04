(function ($) {

window.LANGUAGE = {
    KOREAN: {
        popTit : '공지',
        popMsg : `<div style="text-align: left">ARK Invest Active ETF의 모든 종목의 거래정보를 지금 바로 확인하세요!</br>
ARKK, ARKW, ARKQ, ARKG, ARKF ETF에서 거래하는 모든 개별종목의 하루단위 거래내역을 확인할 수 있습니다.</br>
관심있는 종목을 ARK Invest 거래 정보와 비교해보세요.</br></br>
 <span style="color: red">* <b>ARKer</b>는 ARK Invest 공식 홈페이지(ark-invest.com)에서 제공하는 거래내역을 기반으로합니다.</br>
 * <b>ARKer</b>는 매수 혹은 매도를 권유하지 않으며, 단순히 ARK Invest에서 운용하는 ETF에 포함된 개별종목들의 거래내역을 정리하여 제공합니다.</br>
 * 대한민국 시간 기준으로 매일 오전 9시 30분 또는 오후 12시 30분에 거래내역이 갱신됩니다. (휴장일 제외)</br></span></div>`,
        noResult: "검색결과가 없습니다."
    },
    ENGLISH: {
        popTit : 'Notice',
        popMsg : `<b>ARKer</b> helps users make more rational investments by organizing and providing transaction details of individual stocks included in ETFs operated by ARK Invest.</br><span style="color: red"><b>ARKer</b> does not recommend buying or selling to users, and you are responsible for your investment.</span>`,
        noResult: "No Result"

    },
    CHINESE: {
        popTit : '注意',
        popMsg : `<b>ARKer</b>通过组织和提供由 ARK Invest 运营的ETF中包含的单个股票的交易历史记录，来帮助用户进行更合理的投资。</br><span style="color: red"><b>ARKer</b>不鼓励用户购买或出售产品，您应对您的投资负责。</span>`,
        noResult: "没有结果"
    }
}
window.arker_lan = LANGUAGE.KOREAN;

})(window.jQuery);
