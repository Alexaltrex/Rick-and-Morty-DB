(this["webpackJsonprick-and-morty-ts"]=this["webpackJsonprick-and-morty-ts"]||[]).push([[3],{477:function(e,a,t){"use strict";t.r(a);var n=t(15),r=t(22),o=t(0),s=t.n(o),c=t(13),i=t(119),l=t.n(i),m=t(463),d=t(465),u=t(68),p=t(466);function E(e){var a=b(),t=e.icon,n=e.primary,r=e.to,o=s.a.useMemo((function(){return s.a.forwardRef((function(e,a){return s.a.createElement(c.b,Object.assign({to:r,ref:a},e))}))}),[r]);return s.a.createElement("li",{className:a.item},s.a.createElement(m.a,{button:!0,component:o},t?s.a.createElement(d.a,null,t):null,s.a.createElement(u.a,{color:"primary",variant:"h6"},s.a.createElement(p.a,{primary:n}))))}var h=function(e){var a=e.episode;return s.a.createElement(E,{to:"/episodes/".concat(a.id),primary:"".concat(a.episode," - ").concat(a.name)})},b=l()({item:{"&:nth-of-type(odd)":{backgroundColor:"#eee"}}}),f=t(461),g=t(462),v=t(450),S=t(455),y=t(456),C=t(122),O=t.n(C),j=t(121),w=t.n(j),F=t(445),N=t(469),k=t(468),P=t(120),x=t.n(P),L=t(67),R=t(40),T=Object(k.a)({form:"searchEpisodes",validate:function(e){var a={};return Object(R.a)(e.name)&&""!==e.name&&(a.name="name field is empty"),Object(R.a)(e.episode)&&""!==e.episode&&(a.episode="episode field is empty"),e.name&&!Object(R.a)(e.name)||e.episode&&!Object(R.a)(e.episode)||(a._error="At least one member must be entered"),a}})((function(e){var a=B(),t=e.handleSubmit,n=e.submitting,r=e.pristine,o=e.reset,c=e.error;return s.a.createElement("form",{onSubmit:t},s.a.createElement("div",null,s.a.createElement(N.a,{name:"name",component:L.a,label:"Name",variant:"outlined",size:"small",className:a.field}),s.a.createElement(N.a,{name:"episode",component:L.a,label:"Episode",variant:"outlined",size:"small",className:a.field})),s.a.createElement(y.a,{type:"submit",variant:"contained",startIcon:s.a.createElement(x.a,null),disabled:n||r,className:"".concat(a.field," ").concat(a.button)},"Search"),s.a.createElement(y.a,{type:"button",variant:"contained",disabled:r||n,onClick:o,className:"".concat(a.field," ").concat(a.button)},"Clear Values"),c&&!r&&s.a.createElement(u.a,{color:"error",variant:"h6"},c))})),z=function(e){var a=e.setShowEpisodesFrom,t=e.setSearchingParams;return s.a.createElement(T,{onSubmit:function(e){t(e),a("search")}})},B=Object(F.a)({field:{marginRight:10,marginBottom:10},button:{textTransform:"none",marginRight:10}}),I=t(48),J=I.b.setShowEpisodesFrom,A=I.b.setSearchingParams,M=Object(n.b)((function(e){return{}}),{setShowEpisodesFrom:J,setSearchingParams:A})(z),V=t(72),Z=t.n(V),_=t(80),q=function(e){Object(_.a)();var a=e.episodes,t=e.showEpisodesFrom,n=e.setShowEpisodesFrom,c=e.getEpisodes,i=e.searchingParams,l=e.getEpisodesFromSearch,m=e.isLoading,d=e.totalEpisodesCount,u=e.currentCharacter,p=Object(o.useState)(!1),E=Object(r.a)(p,2),b=E[0],C=E[1],j=D(),F=a.map((function(e){return s.a.createElement(h,{key:e.id,episode:e})}));return Object(o.useEffect)((function(){"all"===t&&c(),"search"===t&&l(i)}),[i.name,i.episode,t]),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,s.a.createElement(f.a,{in:b,timeout:"auto",unmountOnExit:!0},s.a.createElement(M,null))),s.a.createElement(y.a,{onClick:function(){C(!b)},className:j.button,startIcon:b?s.a.createElement(w.a,null):s.a.createElement(O.a,null),variant:"contained"},b?"Close search":"Open search"),s.a.createElement(y.a,{onClick:function(){n("all")},disabled:"all"===t,className:j.button,variant:"contained"},"Show all"),"search"===t&&s.a.createElement("div",{className:j.count},"List of the episodes from search"),"character"===t&&s.a.createElement("div",{className:j.count},u&&"List of the episodes in which this character have been seen: ".concat(u.name)),s.a.createElement("div",{className:j.count},"Total episodes count: ",s.a.createElement(g.a,{badgeContent:d,color:"primary",max:99999,showZero:!0},s.a.createElement(Z.a,null))),m?s.a.createElement("div",{className:j.circular},s.a.createElement(v.a,{size:100,color:"secondary"})):s.a.createElement(S.a,null,F))},D=Object(F.a)({button:{marginRight:10,textTransform:"none"},count:{marginTop:20,marginBottom:20},circular:{display:"flex",justifyContent:"center"}}),G=I.b.setShowEpisodesFrom,H=Object(n.b)((function(e){return{episodes:e.episodes.episodes,totalPagesCount:e.episodes.totalPagesCount,showEpisodesFrom:e.episodes.showEpisodesFrom,searchingParams:e.episodes.searchingParams,isLoading:e.app.isLoading,totalEpisodesCount:e.episodes.totalEpisodesCount,currentCharacter:e.characters.currentCharacter}}),{setShowEpisodesFrom:G,getEpisodes:I.e,getEpisodesFromSearch:I.f})(q);a.default=H}}]);
//# sourceMappingURL=3.5f6ce756.chunk.js.map