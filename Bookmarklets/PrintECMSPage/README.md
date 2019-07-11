## PrintECMSPage
This script allows you to skip several keypresses and other small movements through the process of printing an ECMS page. It accounts for the fact that ECMS pages are not very printable by default (they don't format correctly) and you have to press a button first to format them correctly, which the bookmarklet does. 

This is useful when you have to bulk print lots of ECMS pages. For instance, archiving lots of page for treasury usage like I had to do and I built this bookmarklet to help with. 

## Current Status 

Finished and functional, but improvements can be made.

## Installation

To install this, create a new bookmark in Google Chrome. In the "Name" field, you can put whatever you want. This is just the text that will show up on the bookmarks bar. In the "url" field, copy-paste the entire bookmarklet, from ``` javascript: ``` to the last ``` (); ```. 

There are two bookmarklets in this file. The first one is what you want; The second one is not yet done (haven't had enough time to debug it) but will automate much more of the process eventually. 

## Usage

Simply click the bookmarklet and it will run. It can be run on Summary, Work Order, Explanation, and Authorization pages and will print the current page with good printer formatting. 

## Misc. 

Todo: 

- Automatically change window.title to be whatever you want it to be saved as so you don't have to remember what the names should be and manually type them in 