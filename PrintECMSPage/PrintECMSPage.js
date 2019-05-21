javascript: (function() 
{   
    var titleText = document.querySelectorAll(".Title")[2].textContent; 
    var newWindow; 

    document.title = "0";
    
    /* Each type of page to print requires a slightly different URL to visit (presumably due to PennDOT's backend system) */
    switch (titleText)
    {
        case "Project Information":
            newWindow = window.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PRJmanageProjectInformation.jsp", "Print", "600", "800");
            break;
        case "Work Order":
            newWindow = window.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PWOmanageWorkOrderDetail.jsp", "Print", "600", "800");
            break;
        case "Authorization For Contract Work":
            newWindow = window.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PWOmanageAuthDetail.jsp", "Print", "600", "800"); 
            break;
        case "Work Order Explanation":
            newWindow = window.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PWOmanageExplanation.jsp", "Print", "600", "800"); 
            break;
        default:
            console.error("Didn't recognize title!");
            return;
    }
    
    newWindow.onafterprint = function(event)
    { 
        newWindow.close();  

        if (titleText === "Work Order Explanation" || titleText === "Authorization For Contract Work")
        {
            window.history.back();
        }
    };
    
    /* Changing page titles according to what type of page they are so the suggested print title is already correct */
    newWindow.onbeforeprint = function()
    {
        console.log("titleText: " + titleText);

        /* Each type of page to print requires a slightly different URL to visit (presumably due to PennDOT's backend system) */
        /* No good way to deal with authorizations atm but that'll come later as I go for more complete automation */
        switch (titleText)
        {
            case "Project Information":

                console.log("Switch 1");
                newWindow.document.title = "0";
                break;

            case "Work Order":

                console.log("Switch 2");
                var pageURL = window.location.href.toString();
                var numberAtEndOfURL = "";

                /* Basically just goes until it hits the equals sign */
                for (var i = pageURL.length - 1; i >= 0; i--)
                {
                    var currentCharacter = pageURL.substring(i, i + 1);

                    if (pageURL.substring(i, i + 1) !== "=" )
                        numberAtEndOfURL = currentCharacter + numberAtEndOfURL;
                    else 
                        break;
                }

                /* Trimming any leading zeroes */
                while (numberAtEndOfURL.substring(0, 1) === "0")
                    numberAtEndOfURL = numberAtEndOfURL.substring(1, numberAtEndOfURL.length);

                newWindow.document.title = numberAtEndOfURL;
                break;

            case "Authorization For Contract Work":

                console.log("Switch 3");
                break;

            case "Work Order Explanation":

                console.log("Switch 4");
                var pageURL = window.location.href.toString();
                var numberAtEndOfURL = "";

                /* Basically just goes until it hits the equals sign */
                for (var i = pageURL.length - 1; i >= 0; i--)
                {
                    var currentCharacter = pageURL.substring(i, i + 1);

                    if (pageURL.substring(i, i + 1) !== "=" )
                        numberAtEndOfURL = currentCharacter + numberAtEndOfURL;
                    else 
                        break;
                }

                /* Trimming any leading zeroes */
                while (numberAtEndOfURL.substring(0, 1) === "0")
                    numberAtEndOfURL = numberAtEndOfURL.substring(1, numberAtEndOfURL.length);

                newWindow.document.title = numberAtEndOfURL + "e";
                break;

            default:

                console.log("Switch 5");
                console.error("Didn't recognize title!");
                return;
        }
    };
    
    newWindow.print(); 

})();