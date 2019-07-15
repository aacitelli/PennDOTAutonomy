javascript: (function() 
{   
    let aList = document.getElementsByTagName("a");
    
    let correctIndex = -1;
    for (let i = 0; i < aList.length; i++)
    {
        if (aList[i].getAttribute("title") === "View Explanation")
        {
            correctIndex = i; 
            break;
        }
    }

    if (correctIndex == -1)
    {
        console.log("Couldn't find the right anchor tag!");
    }

    let newWindow = window.open(aList[correctIndex].getAttribute("href"), "_self");
})();