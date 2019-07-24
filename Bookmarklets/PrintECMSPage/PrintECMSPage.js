javascript: (function() 
{
    var titleText = document.querySelectorAll(".Title")[2].textContent;
    var newWindow;
    newWindow.addEventListener("DOMContentLoaded", () =>
    {
        newWindow.print();
    });

    /* Have to set up titling and printing based on what type of page it is */
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
    }
    
    /* For certain pages, goes back a page post-print */
    newWindow.onafterprint = function(event) 
    {
        newWindow.close();
        if (titleText === "Work Order Explanation" || titleText === "Authorization For Contract Work") 
        {
            window.history.back();
        }
    };

    /* Determining naming for the page */
    newWindow.onbeforeprint = function() 
    {
        console.log("titleText: " + titleText);
        switch (titleText) 
        {
            case "Project Information":
                newWindow.document.title = "0";
                break;

            case "Work Order":
                var pageURL = window.location.href.toString();
                var numberAtEndOfURL = "";
                for (var i = pageURL.length - 1; i >= 0; i--) {
                    var currentCharacter = pageURL.substring(i, i + 1);
                    if (pageURL.substring(i, i + 1) !== "=")
                        numberAtEndOfURL = currentCharacter + numberAtEndOfURL;
                    else break;
                }
                while (numberAtEndOfURL.substring(0, 1) === "0")
                    numberAtEndOfURL = numberAtEndOfURL.substring(
                        1,
                        numberAtEndOfURL.length
                    );
                newWindow.document.title = numberAtEndOfURL;
                break;

            case "Authorization For Contract Work":
                console.log("Entered authorization part of switch statement.");
                let labelList = document.querySelectorAll(".label");
                let correctLabelIndex = -1;
                for (let i = 0; i < labelList.length; i++) {
                    if (labelList[i].textContent === "Work Order:") {
                        console.log(
                            "Found the div that contains the Work Order text."
                        );
                        correctLabelIndex = i;
                        break;
                    }
                }
                if (correctLabelIndex === -1)
                    throw new Error(
                        "Unable to find \"label\" with text 'Work Order'!"
                    );
                let parentNode = labelList[correctLabelIndex].parentNode;
                let correctOtherIndex = -1;
                for (let i = 0; i < parentNode.childNodes.length; i++) {
                    if (parentNode.childNodes[i].className === "data") {
                        console.log("This div has that data class name: ");
                        console.log(parentNode.childNodes[i]);
                        correctOtherIndex = i;
                        break;
                    }
                }
                if (correctLabelIndex === -1)
                    throw new Error(
                        "Unable to find data tag as a child of the parent tag!"
                    );
                console.log("Special text content boyo: ");
                console.log(
                    parentNode.childNodes[correctOtherIndex].childNodes[1]
                );
                let workOrderNumber =
                    parentNode.childNodes[correctOtherIndex].childNodes[1]
                        .textContent;
                var pageURL = window.location.href.toString();
                var numberAtEndOfURL = "";
                for (var i = pageURL.length - 1; i >= 0; i--) {
                    var currentCharacter = pageURL.substring(i, i + 1);
                    if (pageURL.substring(i, i + 1) !== "=")
                        numberAtEndOfURL = currentCharacter + numberAtEndOfURL;
                    else break;
                }
                while (
                    workOrderNumber.substring(0, 1) === "0"
                )
                    workOrderNumber = workOrderNumber.substring(
                        1,
                        workOrderNumber.length
                    );
                newWindow.document.title =
                    workOrderNumber + "z" + numberAtEndOfURL;
                break;

            case "Work Order Explanation":
                console.log("Switch 4");
                var pageURL = window.location.href.toString();
                var numberAtEndOfURL = "";
                for (
                    var i = pageURL.length - 1;
                    i >= 0;
                    i--
                ) {
                    var currentCharacter = pageURL.substring(i, i + 1);
                    if (pageURL.substring(i, i + 1) !== "=")
                        numberAtEndOfURL = currentCharacter + numberAtEndOfURL;
                    else break;
                }
                while (numberAtEndOfURL.substring(0, 1) === "0")
                    numberAtEndOfURL = numberAtEndOfURL.substring(
                        1,
                        numberAtEndOfURL.length
                    );
                newWindow.document.title = numberAtEndOfURL + "e";
                break;
        }
    };
})();