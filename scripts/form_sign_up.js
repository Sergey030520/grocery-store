function hideFormSignUp() {
    $(document).find(".authorization-win-content").addClass("min-size_authorization-win");
    let winFormsSign = $(document).find(".authorization-win-content .win-form");
    hideContent(winFormsSign);
    visibleContent($(document).find("#win-form-log_in"));
}
$(document).ready(function (){
    $("#win-form-log_in .btn-authorization-account .button").click(
        function (){
            $(document).find(".authorization-win-content").removeClass("min-size_authorization-win");
            let winFormsSign = $(document).find(".authorization-win-content .win-form");
            hideContent(winFormsSign);
            visibleContent($(document).find("#win-form-sign_up"));
        }
    );
    $(".authorization-win-content .btn-close-win").click(function (){
        hideFormSignUp();
    });
    $("#win-form-sign_up .btn-sign_up-account").click(
        function (){
            hideFormSignUp()
        }
    );



})