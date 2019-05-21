javascript: (function()
{
    /* Printing summary page */
    var summaryPrintWindow = window.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PRJmanageProjectInformation.jsp", "Print", "600", "800");    
    summaryPrintWindow.onafterprint = function() 
    { 
        summaryPrintWindow.close();

        /* Getting link to work orders list */
        var constructList = document.querySelectorAll(".projinfo");

        var workOrdersListIndex = -1;
        for (let i = 0; i < constructList.length; i++)
        {
            if (constructList[i].getAttribute("title") === "View Work Orders")
            {
                workOrdersListIndex = i;
                break;
            }
        }

        /* If workOrdersList is still its default value at the end, no link was found -> throw an error */
        if (workOrdersListIndex === -1)
            throw new Error("Unable to find work orders link under \"Construct\" Menu!");
        else 
            console.log("Found link to the list of work orders from summary page!");

        /* Getting a list of <a> elements that link to each work order */
        console.log("Opening new window at absolute url " + constructList[workOrdersListIndex].getAttribute("href"));
        var workOrdersListWindow = window.open(constructList[workOrdersListIndex].getAttribute("href"), "WorkOrdersListWindow");
        console.log("workOrdersListWindow: ");
        console.log(workOrdersListWindow);
        var workOrderResultsList = workOrdersListWindow.querySelectorAll(".results");
        console.log("workOrderResultsList: ");
        console.log(workOrderResultsList);
        var workOrderList = [];
        for (let i = 0; i < workOrderResultsList.length; i++)
        {
            if (workOrderResultsList[i].getAttribute("title") === "View Work Order")
            {
                workOrderList.push(workOrderResultsList[i]);
            }
        }

        console.log("Work orders div list: ");
        console.log(workOrdersList);

        /* Iterating through each work order */
        for (let i = 0; i < workOrderList.length; i++)
        {
            /* Printing work order page */
            let workOrderWindow = window.open(workOrderList[i].getAttribute("href"));
            let workOrderWindowPrint = workOrderWindowPrint.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PWOmanageWorkOrderDetail.jsp", "Print", "600", "800");
            workOrderWindowPrint.onafterprint = function() 
            { 
                workOrderWindowPrint.close();

                /* Getting a link to the explanation */
                let tdList = document.getElementsByTagName("a");
                var explanationLinkIndex = -1;
                for (let i = 0; i < tdList.length; i++)
                {
                    if (tdList[i].textContent === "Go")
                    {
                        explanationLinkIndex = i;
                        break;
                    }
                }

                if (explanationLinkIndex === -1)
                    throw new Error("Couldn't find explanation link on specific work order page.");

                console.log("Relative href: " + tdList[explanationLinkIndex].getAttribute("href"));
                console.log("Relative href: " + tdList[explanationLinkIndex].href);

                /* Printing the explanation window */
                let explanationWindow = workOrderWindow.open(tdList[explanationLinkIndex].href);   
                let explanationWindowPrint = explanationWindow.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PWOmanageExplanation.jsp", "Print", "600", "800");
                explanationWindowPrint.onafterprint = function() 
                { 
                    explanationWindowPrint.close();

                    let labelClassList = document.querySelectorAll(".label");
                    let authorizationIndex = -1;
                    for (let j = 0; j < labelClassList.length; j++)
                    {
                        if (labelClassList[i].textContent === "Authorization")
                        {
                            authorizationIndex = j;
                            break;
                        }
                    }

                    if (authorizationIndex === -1)
                        throw new Error("Couldn't find div containing Authorization!");
                    
                    let containingBody = labelClassList[i].parentElement; 
                    let authorizationLinks = containingBody.getElementsByTagName("a");

                    authorizationLinks.pop();  
                    
                    for (let j = 0; j < authorizationLinks.length; j++)
                    {
                        let authorizationWindow = workOrderWindow.open(AuthorizationLinks[i].getAttribute("href"));
                        let authorizationWindowPrint = authorizationWindow.open("PDTagServlet?action=printerFriendly&jspName=WEB-INF/jsp/PWOmanageAuthDetail.jsp", "Print", "600", "800");
                        authorizationWindowPrint.onafterprint = function() 
                        { 
                            authorizationWindowPrint.close();
                        };

                        authorizationWindowPrint.print();

                    } /* Iterating through authorizations */

                };

                explanationWindowPrint.print();
            
            }; /* Work Order onafterprint */

            workOrderWindowPrint.print();
        
        } /* Iterating through work orders */

    };

    summaryPrintWindow.print();   
})();