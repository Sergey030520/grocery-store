function deletePostcards(postcards, currentEl, nameClass){
    for (let postcard of postcards) {
        if($(postcard).find(nameClass).is($(currentEl))){
            postcard.remove();
        }
    }
    setCountProducts(counterProductsInBasket());
    updateDataBasket();
}
function deletePostcard(products, currentEl){
    products = products.find(".main__postcard");
    if(products.length <= 1){
        let sectionProducts = products.parent().parent().parent();
        deleteSectionGoods(sectionProducts, currentEl);
    }else{
        deletePostcards(products, currentEl, ".postcard__btn-delete");
    }
    updateDataBasket();
}
function deleteSectionGoods(records, currentEl){
    records = records.find(".personal_section_basket");
    if(records.length <= 1){
        let personalSection = $(document).find(".win-basket__personal_sections");
        delAndHideMainContent( $(personalSection),
            $(personalSection),
            $(document).find(".win-basket__main .win-empty-basket"));
    }else{
        deletePostcards(records, currentEl, ".postcard__btn-delete");
    }
}
function delAndHideMainContent(hideWin, contentDel, winEmptyBasket){
    $(hideWin).removeClass("visible_content")
        .addClass("hidden_content");
    $(contentDel).remove();
    $(winEmptyBasket).removeClass("hidden_content")
        .addClass("visible_content");
}
function increaseCostInBasket(totalCostEl, costProducts, coefficients){
    let totalCost = 0.0;
    for (let coefIdx = 0; coefIdx < coefficients.length; ++coefIdx){
        let coefficient = $(coefficients[coefIdx]).find('span');
        totalCost += getPriceProduct($(costProducts[coefIdx]))*
            parseInt($(coefficient).text());
    }
    let split_line = truncation_number(totalCost).toString().split('.');
    $(totalCostEl).find('.price__integer-number').text(split_line[0]);
    $(totalCostEl).find('.price__fractional-number').text((split_line.length === 1 ?
       "00" : split_line[1]));
}
function increaseTotalCostInBasket(){
    let basket = $(document).find(".win-basket__basket-frame .basket__total-cost");
    let postcards = $(document).find(".win-basket__personal_sections");
    let coefficients = $(postcards).find(".postcard__text-amount-products");
    if(!$(basket).hasClass('.hidden_content')){
        increaseCostInBasket($(basket).find(".postcard__price-before-discount"),
            $(postcards).find(".postcard__total-cost .postcard__price-before-discount"),
            $(coefficients));
        increaseCostInBasket(basket.find(".postcard__price-product"),
            $(postcards).find(".postcard__total-cost .postcard__price-product"),
            $(coefficients));

    }
}
function increaseCostWithoutDiscount(postcard, amount_products){
    let priceEl = postcard.find(".postcard__price-before-discount");
    if(priceEl.length > 0) {
        increasePrice(priceEl, amount_products);
    }
}
function increaseCostWithDiscount(postcard, amount_products){
    let priceEl = postcard.find(".postcard__price-product");
    if(priceEl.length > 0) {
       increasePrice(priceEl, amount_products);
    }
}
function isPostcardInBasket(postcard){
    let postcardsBasket = $(document).find('.win-basket__personal_sections .main__postcard');
    for(let postcardBasket of postcardsBasket){
        if(postcard.is(postcardBasket)){
            return true;
        }
    }
    return false;
}

function increaseCost(postcard, amountProducts){
    let priceEl = $(postcard).find('.postcard__total-cost');
    increaseCostWithDiscount($(priceEl), amountProducts);
    increaseCostWithoutDiscount($(priceEl), amountProducts);
}
function decreaseCost(postcard){
    if (isPostcardInBasket($(postcard))) {
        $(postcard).find(".postcard__btn-delete").click();
    } else {
        hidePrice($(postcard));
        addOrCloseCostProductInBasket($(postcard).find('.postcard__total-cost'),
            false);
    }
}
function counterProductsInBasket(){
    return $(document).find(".win-basket__personal_sections .main__postcard")
        .length;
}
function setCountProducts(countProducts){
    $(document).find(".total-products").text(countProducts);
}

function updateCost(postcard, isIncrease) {
    let amountProductsEl = $(postcard).find(".postcard__text-amount-products span");
    let amountProducts = parseInt($(amountProductsEl).text());
    if (isNaN(amountProducts)) {
        amountProducts = 1;
    } else if (!isIncrease && amountProducts === 1) {
        decreaseCost($(postcard));
        return;
    }else {
        (isIncrease ? amountProducts++ : amountProducts--);
    }
    $(amountProductsEl).text(amountProducts);
    increaseCost($(postcard), amountProducts);
}
function updateDataBasket(){
    increaseTotalCostInBasket();
    updateTotalGoodsInBasket();
    updateTotalWeightInBasket();
}
function updateTotalGoodsInBasket(){
    let totalGoods = counterProductsInBasket();
    let totalGoodsEl = $(document).find(".basket__section-goods .basket__total-goods");
    if(totalGoods === 0){
        $(totalGoodsEl).text("0 товаров");
    }else if(totalGoods === 1){
        $(totalGoodsEl).text("1 товар");
    }else if(totalGoods >= 2 && totalGoods <= 4){
        $(totalGoodsEl).text(totalGoods.toString().concat(" товара"));
    }else{
        $(totalGoodsEl).text(totalGoods.toString().concat(" товаров"));
    }
}
function getWeightGood(postcard){
    let postcardUnit = $(postcard).find(".postcard__unit");
    let weightTxt = $(postcardUnit).attr("data-weight-good");
    let countGoodsEl = $(postcard).find(".postcard__text-amount-products");
    if($(postcardUnit).length > 0 && weightTxt){
        let weight = parseFloat(weightTxt);
        if(countGoodsEl.length > 0) {
            return weight * parseInt(countGoodsEl.text());
        }else{
            return weight;
        }
    }else{
        return 0;
    }
}
function updateTotalWeightInBasket(){
    let postcards = $(document).find(".win-basket__personal_sections .main__postcard");
    let totalWeight = 0.0;
    for (let postcard of postcards){
        totalWeight += getWeightGood(postcard);
    }
    $(document).find(".win-basket__basket-frame .basket__total-weight")
        .text(totalWeight.toFixed(2));
}

$(document).ready(function () {
    setCountProducts(counterProductsInBasket());
    updateDataBasket();

    $(".postcard__increase-amount-products").click(
        function () {
            let postcard = $(this).parent().parent().parent().parent();
            updateCost(postcard, true);
            updateDataBasket();
        }
    );
    $(".postcard__decrease-amount-products").click(
        function () {
            let postcard = $(this).parent().parent().parent().parent();
            updateCost(postcard, false);
            updateDataBasket();
        }
    );
    $(".win-basket__personal_sections .postcard__btn-delete").click(
        function (){
            let records = $(this).parent().parent().parent().parent();
            deletePostcard(records, $(this));
        }
    );
    $(".win-basket__basket-frame .basket__btn-clear").click(function () {
            let personalSection = $(document).find(".win-basket__personal_sections");
            delAndHideMainContent($(personalSection),
                $(personalSection),
                $(document).find(".win-basket__main .win-empty-basket"));
            updateDataBasket();
            setCountProducts(0);
        }
    );
})