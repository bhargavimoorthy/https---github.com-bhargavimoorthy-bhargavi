olark.declare({name:"WelcomeAssist",version:"1.0",startup:function(b,h){function q(){function i(b){return b.replace(/https?\:\/\//g,"").replace(/\/$/,"")}function b(a){a=i(a);a=["^",a.replace(/\./g,"\\.").replace(/\*/g,".*"),"$"];return RegExp(a.join(""))}var c=i(window.location.href),a;for(a in g){var e=g[a],d=e&&!/^\s*$/.test(e)?!0:!1;try{e=e.replace(/\s*$/,"").replace(/^\s*/,"")}catch(f){olark._.hlog("experienced #error_cleaning_validpathstring "+f)}if(g.hasOwnProperty(a)&&d&&b(e).test(c))return!0}return!1}
function j(){q()&&b.chat.operatorsAreAvailable()&&f.get()!==!0&&(f.set(!0),k&&(b.box.expand(),l=!0,b.box.__SPI_setPrechatWelcomeMessage(m)),n&&b.chat.sendNotificationToOperator({body:"this is a new visitor, you might want to welcome him or her"}))}var a=h.WelcomeAssist,c=h.Greeter||{},k=a.welcome_new_visitors||c.welcome_new_visitors?!0:!1,r=a.welcome_delay_in_seconds||c.welcome_delay_in_seconds||5,n=a.notify_operator_of_new_visitors||c.notify_operator_of_new_visitors?!0:!1,d=a.welcome_messages||c.welcome_messages||
["hi, can I help you?"],g;g=c.urls?c.urls&&c.urls.length>0?c.urls:["*"]:a.urls&&a.urls.length>0?a.urls:["*"];var f=b.data.getVisitorObject({key:"did_initiate_ever",initialValue:!1,backup:"wa1",backupTransform:function(a){return a=="true"?!0:!1}}),l=!1,m=function(){var a,b=Math.floor(Math.random()*d.length);a=d[b];for(b=d.length;b&&(typeof a=="undefined"||a==null||/^\s*$/.test(a));)b--,a=d[b];return a||"hi, can I help you?"}();b.chat.onBeginConversation(function(){l&&b.chat.sendNotificationToOperator({body:"in reply to welcome message '"+
m+"'"});f.set(!0)});var o=!1,p=!1;(k||n)&&setTimeout(function(){o?j():p=!0;b.chat.connect()},r*1E3);b.chat.onReady(function(){o=!0;p&&j()})}});
