function hideContents(contents){
    for(let content of contents){
        hideContent(content);
    }
}
function hideContent(content) {
    $(content).removeClass('visible_content')
        .addClass('hidden_content');
}
function isMainContent(content){
    for(let mainContent of $(document).find(".main__content")){
        if($(mainContent).is(content)){
            return true;
        }
    }
    return false;
}
function visibleContent(content){
    if(isMainContent($(content))) {
        hideContents($(document).find(".main__content"));
    }
    $(content).removeClass('hidden_content')
        .addClass('visible_content');
}
function visibleAndHideContent(content){
    if(content.hasClass('hidden_content')){
        visibleContent(content);
    }else{
        visibleContent($("#grocery__content"));
    }
}
function deactivationScrollHtml(deactivation){
    if(deactivation){
        $('.html-page').removeClass("deactivation-scroll")
            .addClass("activation-scroll");
    }else{
        $('.html-page').removeClass("activation-scroll")
            .addClass("deactivation-scroll");
    }
}
function findSubDirWin(buttonActive){
    let buttons = $(document).find(".win-section-catalog .button");
    let subDirWins = $(document).find(".win-catalog .sub-dir-catalog");
    for(let idx = 0; idx < buttons.length; ++idx){
        if($(buttons[idx]).is($(buttonActive))){
            return subDirWins[idx];
        }
    }
    return subDirWins[0];
}
function visibleNavBar(navBarWin){
    hideNavBar();
    $(navBarWin).removeClass("hidden_sub-dir")
        .addClass("visible_sub-dir");
    $('.subdirectory-win').css({"display" : "grid"});
    $('.win-catalog').addClass("dark-background");
    deactivationScrollHtml(false);
}
function hideNavBar(){
    $(document).find(".win-catalog .sub-dir-catalog").removeClass("visible_sub-dir")
        .addClass("hidden_sub-dir");
    $('.subdirectory-win').css({"display" : "none"});
    $('.win-catalog').removeClass("dark-background");
    deactivationScrollHtml(true);
}
function setMaxSizeContent(content){
    if($(content).attr('id') === 'grocery__content') {
        $(content).removeClass('min-size-win-grocery-store')
            .addClass('max-size-win-grocery-store');
    }else{
        $(content).removeClass('main__content_min-size-win')
            .addClass('main__content_max-size-win');
    }
}
function setMinSizeContent(content){
    if($(content).attr('id') === 'grocery__content') {
        $(content).removeClass('max-size-win-grocery-store')
            .addClass('min-size-win-grocery-store');
    }else{
        $(content).removeClass('main__content_max-size-win')
            .addClass('main__content_min-size-win');
    }
}
function resizeContent(contents, increaseSize){
    for (let content of contents) {
        (increaseSize ? setMaxSizeContent(content) : setMinSizeContent(content))
    }
}
function hideOrVisibleSectionCatalog(catalog, hide) {
    let display = (hide ? "none" : "block");
    $('.win-section-catalog').css({"display": display});
    if(hide){
        $(document).find('.win-catalog').addClass("hidden_content");
    }else{
        $(document).find('.win-catalog').removeClass("hidden_content");
    }
}

$(document).ready(function () {
    $(".grocery-service-delivery .button, .btn-log-in-account .button").click(
       function (){
           deactivationScrollHtml(false);
           if($(this).parent().hasClass('btn-log-in-account')){
                visibleContent($(document).find('#authorization-win'));
           }else{
               visibleContent($(document).find('#location-nearby-store-win'));
           }
       }
    );
    $(".btn-close-win").click(
        function (){
            let windows = $(document).find(".additional_window");
            for(let window of windows){
                hideContent($(window));
            }
            deactivationScrollHtml(true);
        }
    );

    $("#btn-win-catalog").click(
        function () {
            let catalog = $('.win-section-catalog').css("display");
            let contents = $('.main__content');
            hideOrVisibleSectionCatalog(catalog, (catalog !== 'none'));
            resizeContent(contents, (catalog !== 'none'));
        }
    );

    $(".win-section-catalog .button").hover(
        function () {
            visibleNavBar(findSubDirWin($(this)));
        },
        function () {}
    );
    $(".subdirectory-win").hover(
        function () {},
        function () {
            hideNavBar();
        }
    );

    /*-----------*/
    $(".data-about-delivery").click(function () {
        visibleAndHideContent($('#delivery_content'));
    });
    $(".delivery-data").click(function () {
        visibleAndHideContent($('#pick-up_content'));
    });
    $(".favourites").click(function () {
        visibleAndHideContent($('#favourite-product-content'));
    });
    $(".basket").click(function () {
        visibleAndHideContent($('#basket-product-content'));
    });

    $(".favourite__header .basket__btn-clear").click(function () {
        let catalogSection = $(document).find(".section-catalog-items");
        delAndHideMainContent($(catalogSection),
            $(catalogSection).find(".main__postcard"),
            $(document).find(".favourite__main .win-empty-basket"));
        }
    );
    $(".btn-load-page-product").click(function () {

    });

})
