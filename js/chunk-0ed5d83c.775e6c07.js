(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ed5d83c"],{"035c":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Tweets",{attrs:{initialTweets:e.tweetsLikes}})},s=[],a=r("5530"),c=(r("96cf"),r("1da1")),i=r("c136"),u=r("1602"),o=r("2fa3"),w=r("2f62"),f={components:{Tweets:i["a"]},data:function(){return{tweetsLikes:[]}},created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=e.$route.params.userId,e.fetchUserTweetsLikes(r);case 2:case"end":return t.stop()}}),t)})))()},beforeRouteUpdate:function(e,t,r){var n=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:s=e.params.userId,n.fetchUserTweetsLikes(s),r();case 3:case"end":return t.stop()}}),t)})))()},computed:Object(a["a"])({},Object(w["b"])(["currentUser","isAuthenticated"])),methods:{fetchUserTweetsLikes:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u["a"].getUserTweetsLikes({userId:e});case 3:n=r.sent,s=n.data,t.tweetsLikes=s,r.next=12;break;case 8:r.prev=8,r.t0=r["catch"](0),console.log(r.t0),o["a"].fire({icon:"error",title:"無法取得推文，請稍後再試"});case 12:case"end":return r.stop()}}),r,null,[[0,8]])})))()}}},p=f,d=(r("177b"),r("2877")),h=Object(d["a"])(p,n,s,!1,null,"a22b4a80",null);t["default"]=h.exports},"177b":function(e,t,r){"use strict";r("9053")},9053:function(e,t,r){}}]);
//# sourceMappingURL=chunk-0ed5d83c.775e6c07.js.map