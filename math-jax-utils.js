var MathJaxUtils = (function () {
    let obj = {};
    let scripts = null;
 
    obj.render = function (element) {
        scripts = new Array();
        $(element).find("script[id^='MathJax-Element']").each(function () {
            scripts.push({
                displayElement: $(this).prev("div")[0],
                scriptElement: this
            });
        });
        //remove all html within MathJax script tags so it doesn't get typset again when Typeset method is called
        $(element).find("script[id^='MathJax-Element']").remove();
        //render Math using original MathJax API and in callback re-insert the MathJax script elements in their original positions
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, element, typeSetDone]);
    };
 
     //callback for Typeset method
     function typeSetDone() {
         for (var i = 0; i < scripts.length; i++) {
             $(scripts[i].displayElement).after(scripts[i].scriptElement);
         }
         //reset scripts variable
         scripts = [];
     };
 
    return obj;
 }());