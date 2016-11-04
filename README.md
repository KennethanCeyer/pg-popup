# PIGNOSE-Popup

> PIGNOSE Popup is simple flat design modal plugin.

[![npm version](https://badge.fury.io/js/pg-popup.svg)](https://badge.fury.io/js/pg-popup) [![Bower version](https://badge.fury.io/bo/pg-popup.svg)](https://badge.fury.io/bo/pg-popup) [![Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![Screenshot Main](http://www.pigno.se/barn/PIGNOSE-Popup/demo/img/screenshot_main.png)

* [See demo](http://www.pigno.se/barn/PIGNOSE-Popup/)
* It works fine in IE 7+, FF, Chrome, Opera and Safari And `OS-X safari`.

### Usage
1. It is required jquery library ([Download link](http://www.jquery.com/download/)).
2. Import pignose.popup.min.js, Import pignose.popup.min.css in your head element.
3. Insert a snippet like `$select.pignosePopup();`

----

#### If you use bower

 ```shell
bower install pg-popup
 ```
 
 ----

#### If you use npm

 ```shell
npm install pg-popup
 ```
 
Move `dist/pignose.popup.min.js`, `dist/pignose.popup.min.css` to your project folder.

----

### Options

| Option    | Default     | Type         | Description                                                                |
|-----------|-------------|--------------|----------------------------------------------------------------------------|
| animate   | true        | Boolean      | Use animation when popup opened.                                           |
| btn_close | .btn_close  | String       | This option provide to bind to close of popup function on button by jQuery Select as String type. |
| escape    | true        | Boolean      | This option provide to bind to close function on background of popup       |
| theme     | none        | String       | Custom class name for modal window.                                        |
| scroll    | false       | Boolean      | This option modal will follow your scroll top.                             |

----

### Colours

- Support 5 colours (red, blue, black, orange, mint).

----

### Question

If you found something problem of this plugin, or you have some question.

Please send me a message to use either [gitter](https://gitter.im/KennethanCeyer/PIGNOSE) or [Github issue](https://github.com/KennethanCeyer/PIGNOSE-Popup/issues). (gitter url is on the top of the manual)
