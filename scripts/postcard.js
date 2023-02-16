function truncation_number(number) {
    return parseInt((number * 100).toString())/100;
}
function createTextForFieldUnit(obj){
    let price_product = getPriceProduct(obj);
    let currency = obj.find('.price__currency').text();
    return price_product.toString().concat(' - ').concat(currency).concat('.');
}
function setTotalPriceGood(priceEl, priceInt, priceFractional){
    priceEl.find('.price__integer-number').text(priceInt);
    priceEl.find('.price__fractional-number').text(priceFractional);
}
function increasePrice(priceEl, coefficient) {
    let price_product = getPriceProduct(priceEl) * coefficient;
    let split_line = truncation_number(price_product).toString().split('.');
    setTotalPriceGood(priceEl, split_line[0], split_line[1]);
}
function getPriceProduct(priceEl){
    let price_integer = 0;
    let fractional = 0;
    if($(priceEl).find('.price__integer-number').attr('data-value')){
        price_integer = priceEl.find('.price__integer-number').attr('data-value');
    }
    if($(priceEl).find('.price__fractional-number').attr('data-value')){
        fractional = priceEl.find('.price__fractional-number').attr('data-value');
    }
    return parseFloat(price_integer.concat('.').concat(fractional));
}
function addOrCloseCostProductInBasket(postcard, visible){
    let totalConstEl = $(postcard).find('.postcard__text-total-cost-in-basket');
    totalConstEl.css({"display" : (visible ? "block" : "none")});
    postcard.find('.main__postcard_main-content').css({"gap" : ( visible ? "7px" :
            "13px")});
}
function hidePrice(postcard){
    $(postcard).find(".postcard__button_add-bucket").css({"display" : "flex"});
    $(postcard).find(".postcard__change-field-quantity").css({"display" : "none"});
    $(postcard).find(".postcard__price-before-discount").css({"display" : "grid"});
    let uintEl = $(postcard).find(".postcard__unit");
    $(uintEl).text(uintEl.attr('data-value'));
}
function initFieldChanger(postcard){
    $(postcard).find(".postcard__button_add-bucket").css({"display" : "none"});
    $(postcard).find(".postcard__change-field-quantity").css({"display" : "flex"});
    $(postcard).find('.postcard__unit').text(
        $(postcard).find('.postcard__unit').text().concat(
            createTextForFieldUnit($(postcard).find('.postcard__price-product'))));
    $(postcard).find('.postcard__price-before-discount')
        .css({'display' : 'none'});
}

$(document).ready(function () {
        $(".postcard__button_add-bucket").click(
            function () {
                let postcard = $(this).parent().parent().parent();
                initFieldChanger(postcard);
                addOrCloseCostProductInBasket(postcard, true);
            }
        );
    }
);