(this["webpackJsonprick-and-morty-ts"]=this["webpackJsonprick-and-morty-ts"]||[]).push([[0],{222:function(e,t,a){e.exports=a(367)},227:function(e,t,a){},367:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(11),o=a.n(c),s=(a(227),a(396)),i=a(398),u=a(399),l=a(400),m=a(72),p=Object(s.a)((function(e){return Object(i.a)({appBar:{zIndex:e.zIndex.drawer+1}})})),d=function(){var e=p();return n.a.createElement(u.a,{position:"fixed",className:e.appBar},n.a.createElement(l.a,null,n.a.createElement(m.a,{variant:"h6",noWrap:!0},"Rick and Morty DB")))},E=a(427),h=a(402),f=a(197),C=a.n(f),g=a(198),b=a.n(g),v=a(199),R=a.n(v),O=a(23),S=a(22),T=a(104),w=a.n(T),A=a(106),y=a.n(A),j=a(401),P=function(e){var t=e.to,a=e.primary,r=e.icon,c=e.currentItem,o=e.ownIndex,s=e.setCurrentItem;return n.a.createElement("li",null,n.a.createElement(j.a,{onClick:function(){s(o)},selected:o===c,button:!0,component:S.b,to:t},r?n.a.createElement(w.a,{color:"primary"},r):null,n.a.createElement(y.a,{primary:a})))},_=a(21),x={currentItem:0},I=function(e){return{type:"SIDEBAR/SET_CURRENT_ITEM",currentItem:e}},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIDEBAR/SET_CURRENT_ITEM":return Object(_.a)({},e,{currentItem:t.currentItem});default:return e}},k=Object(O.b)((function(e){return{currentItem:e.sidebar.currentItem}}),{setCurrentItem:I})(P),H=Object(s.a)((function(e){return{drawer:{width:180,flexShrink:0},drawerPaper:{width:180},drawerContainer:{overflow:"auto"}}})),L=function(){var e=H();return n.a.createElement(E.a,{className:e.drawer,variant:"permanent",classes:{paper:e.drawerPaper}},n.a.createElement(l.a,null),n.a.createElement("div",{className:e.drawerContainer},n.a.createElement(h.a,null,n.a.createElement(k,{ownIndex:1,to:"/characters",primary:"Characters",icon:n.a.createElement(C.a,null)}),n.a.createElement(k,{ownIndex:2,to:"/locations",primary:"Locations",icon:n.a.createElement(b.a,null)}),n.a.createElement(k,{ownIndex:3,to:"/episodes",primary:"Episodes",icon:n.a.createElement(R.a,null)}))))},D=a(17),F=function(){return n.a.createElement(m.a,{paragraph:!0},"Locations")},G=a(110),U=a.n(G),B=a(403),z=a(404),M=U()({chip:{marginBottom:5}});function W(e){var t=e.icon,a=e.primary,r=e.to,c=n.a.useMemo((function(){return n.a.forwardRef((function(e,t){return n.a.createElement(S.b,Object.assign({to:r,ref:t},e))}))}),[r]);return n.a.createElement("li",null,n.a.createElement(j.a,{button:!0,component:c},t?n.a.createElement(B.a,null,t):null,n.a.createElement(m.a,{color:"primary",variant:"h6"},n.a.createElement(z.a,{primary:a}))))}var J=function(e){M();var t=e.episode;return n.a.createElement(W,{to:"/episodes/".concat(t.id),primary:"".concat(t.episode," - ").concat(t.name)})},$=function(e){var t=e.episodes,a=(e.totalPagesCount,e.currentPage),c=e.getEpisodes,o=(e.setCurrentEpisode,t.map((function(e){return n.a.createElement(J,{key:e.id,episode:e})})));return Object(r.useEffect)((function(){c(a)}),[a]),n.a.createElement(h.a,null,o)},V=a(116),q=a(405),K=a(406),Q=a(407),X=a(408),Y=a(409),Z=Object(s.a)({root:{width:150},media:{height:150}}),ee=function(e){var t=e.character,a=Z();return n.a.createElement(q.a,{item:!0},n.a.createElement(K.a,{className:a.root},n.a.createElement(Q.a,{component:S.b,onClick:function(){},to:"characters/".concat(t.id)},n.a.createElement(X.a,{className:a.media,image:t.image})),n.a.createElement(Y.a,null,n.a.createElement(m.a,{gutterBottom:!0,variant:"body2",component:"h6"},t.name))))},te=a(425),ae=U()((function(e){return Object(i.a)({root:{"& > *":{marginTop:e.spacing(2),marginBottom:e.spacing(2)}}})})),re=function(e){var t=e.totalPaginatorPagesCount,a=e.onPaginatorItemClick,r=e.currentPage,c=ae();return n.a.createElement("div",{className:c.root},n.a.createElement(te.a,{onChange:function(e,t){a(t)},page:r,showFirstButton:!0,showLastButton:!0,count:t,variant:"outlined",shape:"rounded"}))},ne=a(414),ce=a(415),oe=a(416),se=a(413),ie=a(147),ue=a(429),le=a(423),me=a(422),pe=a(412),de=a(431),Ee=a(424),he=a(202),fe=a.n(he),Ce=function(e){var t=e.label,a=e.input,r=e.meta,c=r.touched,o=r.invalid,s=r.error,i=Object(ie.a)(e,["label","input","meta"]);return n.a.createElement(ue.a,Object.assign({label:t,placeholder:t,error:c&&o,helperText:c&&s},a,i))},ge=function(e){var t=e.input,a=e.label,r=e.meta,c=(r.touched,r.error,e.children),o=Object(ie.a)(e,["input","label","meta","children"]);return n.a.createElement(pe.a,null,n.a.createElement(de.a,{htmlFor:a},a),n.a.createElement(Ee.a,Object.assign({native:!0},t,o,{inputProps:{name:a,id:a}}),c))},be=Object(s.a)({field:{marginRight:10,marginBottom:10},button:{textTransform:"none",marginRight:10}}),ve=Object(me.a)({form:"searchCharacters",validate:function(e){var t=function(e){return/^\s+$/.test(e)},a={};return t(e.name)&&""!==e.name&&(a.name="name field is empty"),t(e.species)&&""!==e.species&&(a.species="species field is empty"),t(e.type)&&""!==e.type&&(a.type="type field is empty"),e.name&&!t(e.name)||e.gender||e.gender||e.species&&!t(e.species)||e.type&&!t(e.type)||(a._error="At least one member must be entered"),console.log(a),a}})((function(e){var t=be(),a=e.handleSubmit,r=e.submitting,c=e.pristine,o=e.reset,s=e.error;return n.a.createElement("form",{onSubmit:a},n.a.createElement("div",null,n.a.createElement(le.a,{name:"name",component:Ce,label:"Name",variant:"outlined",size:"small",className:t.field}),n.a.createElement(le.a,{name:"species",component:Ce,label:"Species",variant:"outlined",size:"small",className:t.field}),n.a.createElement(le.a,{name:"type",component:Ce,label:"Type",variant:"outlined",size:"small"})),n.a.createElement("div",null,n.a.createElement(le.a,{name:"status",className:t.field,component:ge,label:"Status"},n.a.createElement("option",{value:""}),n.a.createElement("option",{value:"alive"},"Alive"),n.a.createElement("option",{value:"dead"},"Dead"),n.a.createElement("option",{value:"unknown"},"Unknown")),n.a.createElement(le.a,{name:"gender",component:ge,label:"Gender"},n.a.createElement("option",{value:""}),n.a.createElement("option",{value:"female"},"Female"),n.a.createElement("option",{value:"male"},"Male"),n.a.createElement("option",{value:"genderless"},"Genderless"),n.a.createElement("option",{value:"unknown"},"Unknown"))),n.a.createElement(se.a,{type:"submit",variant:"contained",startIcon:n.a.createElement(fe.a,null),disabled:r||c,className:"".concat(t.field," ").concat(t.button)},"Search"),n.a.createElement(se.a,{type:"button",variant:"contained",disabled:c||r,onClick:o,className:"".concat(t.field," ").concat(t.button)},"Clear Values"),s&&!c&&n.a.createElement(m.a,{color:"error",variant:"h6"},s))})),Re=function(e){var t=e.setShowCharactersFromSearch,a=e.setSearchingParams,r=e.setCurrentPage;return n.a.createElement(ve,{onSubmit:function(e){console.log(e),r(1),a(e),t(!0)}})},Oe=a(13),Se=a.n(Oe),Te=a(28),we=a(118),Ae=a.n(we),ye=Ae.a.create({baseURL:"https://rickandmortyapi.com/api/"}),je=function(){var e=arguments;return Object(Te.a)(Se.a.mark((function t(){var a,r;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.length>0&&void 0!==e[0]?e[0]:1,t.next=3,ye.get("character/?page=".concat(a));case 3:return r=t.sent,t.abrupt("return",r.data);case 5:case"end":return t.stop()}}),t)})))()},Pe=function(e){return Object(Te.a)(Se.a.mark((function t(){var a;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Ae.a.get(e);case 2:return a=t.sent,t.abrupt("return",a.data);case 4:case"end":return t.stop()}}),t)})))()},_e=function(e){return Object(Te.a)(Se.a.mark((function t(){var a;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ye.get("character/".concat(e));case 2:return a=t.sent,t.abrupt("return",a.data);case 4:case"end":return t.stop()}}),t)})))()},xe=function(e,t){return Object(Te.a)(Se.a.mark((function a(){var r,n;return Se.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r="",e.name&&(r="".concat(r,"name=").concat(e.name)),e.gender&&(r="".concat(r,"&gender=").concat(e.gender)),e.status&&(r="".concat(r,"&status=").concat(e.status)),e.species&&(r="".concat(r,"&species=").concat(e.species)),e.type&&(r="".concat(r,"&type=").concat(e.type)),r="".concat(r,"&page=").concat(t),a.next=9,ye.get("character/?".concat(r));case 9:return n=a.sent,console.log(n),a.abrupt("return",n.data);case 12:case"end":return a.stop()}}),a)})))()},Ie=function(){var e=arguments;return Object(Te.a)(Se.a.mark((function t(){var a,r;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.length>0&&void 0!==e[0]?e[0]:1,t.next=3,ye.get("episode/?page=".concat(a));case 3:return r=t.sent,t.abrupt("return",r.data);case 5:case"end":return t.stop()}}),t)})))()},Ne=function(e){return Object(Te.a)(Se.a.mark((function t(){var a;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ye.get("episode/".concat(e));case 2:return a=t.sent,t.abrupt("return",a.data);case 4:case"end":return t.stop()}}),t)})))()},ke=function(e){return Object(Te.a)(Se.a.mark((function t(){var a;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Ae.a.get(e);case 2:return a=t.sent,t.abrupt("return",a.data);case 4:case"end":return t.stop()}}),t)})))()},He={initialized:!1,characters:[],totalCharactersCount:0,totalPagesCount:0,currentPage:1,currentCharacter:null,currentCharacterId:null,next:null,prev:null,isLoading:!1,showCharactersFromSearch:!1,searchingParams:{name:"",gender:"",status:"",species:"",type:""},searchError:!1,episodesOfCurrentCharacter:null},Le=function(e){return{type:"CHARACTERS/TOGGLE_LOADING",isLoading:e}},De=function(e){return{type:"CHARACTERS/SET_CHARACTERS",charactersData:e}},Fe=function(e){return{type:"CHARACTERS/SET_CURRENT_CHARACTER",currentCharacter:e}},Ge=function(e){return{type:"CHARACTERS/SET_CURRENT_CHARACTER_ID",currentCharacterId:e}},Ue=function(e){return{type:"CHARACTERS/SET_CURRENT_PAGE",currentPage:e}},Be=function(e){return{type:"CHARACTERS/SET_SHOW_CHARACTERS_FROM_SEARCH",showCharactersFromSearch:e}},ze=function(e){return{type:"CHARACTERS/SET_SEARCH_ERROR",searchError:e}},Me=function(e){return{type:"CHARACTERS/SET_EPISODES_OF_CURRENT_CHARACTER",episodesOfCurrentCharacter:e}},We=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:He,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHARACTERS/TOGGLE_LOADING":return Object(_.a)({},e,{isLoading:t.isLoading});case"CHARACTERS/SET_CHARACTERS":return Object(_.a)({},e,{characters:t.charactersData.results,totalCharactersCount:t.charactersData.info.count,totalPagesCount:t.charactersData.info.pages,next:t.charactersData.info.next,prev:t.charactersData.info.prev});case"CHARACTERS/SET_CURRENT_CHARACTER":return Object(_.a)({},e,{currentCharacter:t.currentCharacter});case"CHARACTERS/SET_CURRENT_CHARACTER_ID":return Object(_.a)({},e,{currentCharacterId:t.currentCharacterId});case"CHARACTERS/SET_CURRENT_PAGE":return Object(_.a)({},e,{currentPage:t.currentPage});case"CHARACTERS/SET_SHOW_CHARACTERS_FROM_SEARCH":return Object(_.a)({},e,{showCharactersFromSearch:t.showCharactersFromSearch});case"CHARACTERS/SET_SEARCHING_PARAMS":return Object(_.a)({},e,{searchingParams:Object(_.a)({},e.searchingParams,{},t.searchingParams)});case"CHARACTERS/SET_SEARCH_ERROR":return Object(_.a)({},e,{searchError:t.searchError});case"CHARACTERS/SET_EPISODES_OF_CURRENT_CHARACTER":return Object(_.a)({},e,{episodesOfCurrentCharacter:t.episodesOfCurrentCharacter});default:return e}},Je=Be,$e=function(e){return{type:"CHARACTERS/SET_SEARCHING_PARAMS",searchingParams:e}},Ve=Ue,qe=Object(O.b)((function(e){return{}}),{setShowCharactersFromSearch:Je,setSearchingParams:$e,setCurrentPage:Ve})(Re),Ke=a(204),Qe=a.n(Ke),Xe=a(203),Ye=a.n(Xe),Ze=a(114),et=a.n(Ze),tt=Object(s.a)({button:{marginRight:10,textTransform:"none"},count:{marginTop:20,marginBottom:20}}),at=function(e){var t=e.characters,a=e.totalPagesCount,c=e.currentPage,o=e.totalCharactersCount,s=e.getCharacters,i=e.setCurrentPage,u=e.searchError,l=e.showCharactersFromSearch,m=e.setShowCharactersFromSearch,p=e.getCharactersFromSearch,d=e.searchingParams,E=e.isLoading,h=tt(),f=Object(r.useState)(!1),C=Object(V.a)(f,2),g=C[0],b=C[1];Object(r.useEffect)((function(){l?p(d,c):s(c)}),[c,d.status,d.species,d.name,d.gender,d.type,l]);var v=t.map((function(e){return n.a.createElement(ee,{key:e.id,character:e})})),R=u?0:o;return n.a.createElement(n.a.Fragment,null,n.a.createElement(ne.a,{in:g,timeout:"auto",unmountOnExit:!0},n.a.createElement(qe,null)),n.a.createElement(se.a,{onClick:function(){b(!g)},className:h.button,startIcon:g?n.a.createElement(Ye.a,null):n.a.createElement(Qe.a,null),variant:"contained"},g?"Close search":"Open search"),n.a.createElement(se.a,{onClick:function(){m(!1),i(1)},className:h.button,variant:"contained"},"Show all"),n.a.createElement("div",{className:h.count},"Total characters count: ",n.a.createElement(ce.a,{badgeContent:R,color:"primary",max:99999},n.a.createElement(et.a,null))),u?null:n.a.createElement(re,{totalPaginatorPagesCount:a,onPaginatorItemClick:function(e){i(e)},currentPage:c}),E?n.a.createElement(oe.a,{size:100,color:"secondary"}):u?null:n.a.createElement(q.a,{container:!0,alignContent:"stretch",justify:"space-between",wrap:"wrap",spacing:1},v))},rt=Ue,nt=Be,ct=Object(O.b)((function(e){return{characters:e.characters.characters,totalPagesCount:e.characters.totalPagesCount,currentPage:e.characters.currentPage,showCharactersFromSearch:e.characters.showCharactersFromSearch,searchingParams:e.characters.searchingParams,isLoading:e.characters.isLoading,searchError:e.characters.searchError,totalCharactersCount:e.characters.totalCharactersCount}}),{getCharacters:function(e){return function(){var t=Object(Te.a)(Se.a.mark((function t(a){var r;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(Le(!0)),t.next=3,je(e);case 3:r=t.sent,a(De(r)),a(Le(!1));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},setCurrentPage:rt,setShowCharactersFromSearch:nt,getCharactersFromSearch:function(e,t){return function(){var a=Object(Te.a)(Se.a.mark((function a(r){var n;return Se.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,r(Le(!0)),a.next=4,xe(e,t);case 4:n=a.sent,r(ze(!1)),r(De(n)),a.next=13;break;case 9:a.prev=9,a.t0=a.catch(0),console.log("error"),r(ze(!0));case 13:return a.prev=13,r(Le(!1)),a.finish(13);case 16:case"end":return a.stop()}}),a,null,[[0,9,13,16]])})));return function(e){return a.apply(this,arguments)}}()}})(at),ot=a(14),st=a(5),it=a(417),ut=a(418),lt=a(419),mt=a(209),pt=a(420),dt=a(421),Et=a(205),ht=a.n(Et),ft=a(206),Ct=a.n(ft),gt=Object(s.a)({buttons:{marginTop:5,marginBottom:20},button:{textTransform:"none"},card:{width:300,borderRadius:5,boxShadow:"5px 5px 5px 0px rgba(0, 0, 0, .5)",marginBottom:10},media:{height:300},paper:{width:300},image:{}});function bt(e){var t=e.icon,a=e.primary,n=e.to,c=r.useMemo((function(){return r.forwardRef((function(e,t){return r.createElement(S.b,Object.assign({to:n,ref:t},e))}))}),[n]);return r.createElement("li",null,r.createElement(j.a,{button:!0,component:c},t?r.createElement(w.a,null,t):null,r.createElement(m.a,{color:"primary",variant:"h6"},r.createElement(y.a,{primary:a}))))}Object(st.a)((function(e){return Object(i.a)({root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}})}))(it.a);var vt=function(e,t){return r.createElement(it.a,null,r.createElement(ut.a,null,e),r.createElement(ut.a,null,t))},Rt=function(e){var t=e.currentCharacter,a=e.totalCharactersCount,n=e.match,c=(e.currentCharacterId,e.getCurrentCharacter),o=e.isLoading,s=(e.setCurrentCharacterId,e.episodesOfCurrentCharacter),i=gt(),u=+n.params.id,l=Object(r.useState)(0),m=Object(V.a)(l,2),p=m[0],d=m[1];Object(r.useEffect)((function(){d(u),c(u)}),[]),Object(r.useEffect)((function(){p&&c(p)}),[p]);var E=u+1,f=u-1;return r.createElement("div",null,t&&r.createElement("div",null,r.createElement(q.a,{container:!0,justify:"space-between",className:i.buttons},r.createElement(se.a,{onClick:function(){d(p-1)},className:i.button,component:S.b,to:"/characters/".concat(f),disabled:1===t.id||o,variant:"contained",color:"default",size:"medium",startIcon:r.createElement(ht.a,null)},"Previous character"),r.createElement(se.a,{disabled:o,className:i.button,component:S.b,to:"/characters",variant:"contained",color:"default",size:"medium",startIcon:r.createElement(et.a,null)},"Back to characters"),r.createElement(se.a,{onClick:function(){d(p+1)},className:i.button,component:S.b,to:"/characters/".concat(E),disabled:t.id===a||o,variant:"contained",color:"default",size:"medium",endIcon:r.createElement(Ct.a,null)},"Next character")),o?r.createElement(oe.a,{size:100,color:"secondary"}):r.createElement("div",null,r.createElement(K.a,{className:i.card},r.createElement(X.a,{className:i.media,image:t.image})),r.createElement(lt.a,{component:mt.a},r.createElement(pt.a,null,r.createElement(dt.a,null,vt("Name",t.name),vt("Gender",t.gender),vt("Status",t.status),vt("Species",t.species),t.type&&vt("Subspecies",t.type),vt("Origin location",t.origin.name),vt("Last known location endpoint",t.location.name)))),r.createElement(h.a,null,s.map((function(e){return r.createElement(bt,{to:"/episodes/".concat(e.id),primary:"".concat(e.episode," - ").concat(e.name)})}))))))},Ot=Ge,St=Object(ot.d)(Object(O.b)((function(e){return{currentCharacter:e.characters.currentCharacter,totalCharactersCount:e.characters.totalCharactersCount,isLoading:e.characters.isLoading,currentCharacterId:e.characters.currentCharacterId,episodesOfCurrentCharacter:e.characters.episodesOfCurrentCharacter}}),{getCurrentCharacter:function(e){return function(){var t=Object(Te.a)(Se.a.mark((function t(a){var r,n,c;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(Le(!0)),t.next=3,_e(e);case 3:return r=t.sent,a(Fe(r)),n=r.episode.map((function(e){return ke(e)})),t.next=8,Promise.all(n);case 8:c=t.sent,a(Me(c)),a(Le(!1));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},setCurrentCharacterId:Ot}),D.e)(Rt),Tt=a(146),wt={initialized:!1,episodes:[],totalEpisodesCount:0,totalPagesCount:0,currentPage:1,currentEpisode:{},next:null,prev:null,isLoading:!1,charactersOfCurrentEpisode:null},At=function(e){return{type:"TOGGLE_LOADING",isLoading:e}},yt=function(e){return{type:"SET_EPISODES",episodesData:e}},jt=function(e){return{type:"SET_CURRENT_EPISODE",currentEpisode:e}},Pt=function(e){return{type:"SET_CHARACTERS_OF_CURRENT_EPISODE",charactersOfCurrentEpisode:e}},_t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:wt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOGGLE_LOADING":return Object(_.a)({},e,{isLoading:t.isLoading});case"SET_EPISODES":return Object(_.a)({},e,{episodes:t.episodesData.results,totalEpisodesCount:t.episodesData.info.count,totalPagesCount:t.episodesData.info.pages,next:t.episodesData.info.next,prev:t.episodesData.info.prev});case"SET_CURRENT_EPISODE":return Object(_.a)({},e,{currentEpisode:t.currentEpisode});case"SET_CURRENT_PAGE":return Object(_.a)({},e,{currentPage:t.currentPage});case"SET_CHARACTERS_OF_CURRENT_EPISODE":return Object(_.a)({},e,{charactersOfCurrentEpisode:t.charactersOfCurrentEpisode});default:return e}},xt=function(e){return{type:"SET_CURRENT_PAGE",currentPage:e}},It=Object(O.b)((function(e){return{episodes:e.episodes.episodes,totalPagesCount:e.episodes.totalPagesCount,currentPage:e.episodes.currentPage}}),{getEpisodes:function(){return function(){var e=Object(Te.a)(Se.a.mark((function e(t,a){var r,n,c,o,s,i,u,l,m;return Se.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(At(!0)),e.next=3,Ie();case 3:for(r=e.sent,n=r.info.pages,c=[],o=1;o<=n;o++)c.push(o);return s=c.map((function(e){return Ie(e)})),e.next=10,Promise.all(s);case 10:for(i=e.sent,(u={}).info=i[0].info,l=[],m=0;m<n;m++)l=[].concat(Object(Tt.a)(l),Object(Tt.a)(i[m].results));u.results=l,t(yt(u)),t(At(!1));case 18:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},setCurrentPage:xt})($),Nt=a(432),kt=Object(s.a)({chip:{margin:2},button:{borderRadius:28,padding:2,paddingRight:5,margin:2,marginBottom:4,textTransform:"none"},avatar:{marginRight:5}}),Ht=function(e){var t=e.isLoading,a=e.match,c=e.getCurrentEpisode,o=e.currentEpisode,s=e.charactersOfCurrentEpisode,i=e.setCurrentItem,u=a.params.id,l=kt();Object(r.useEffect)((function(){c(u),console.log(o)}),[]);var p=function(){i(2)};return n.a.createElement(n.a.Fragment,null,o&&s&&n.a.createElement("div",null,n.a.createElement(m.a,{color:"error",variant:"h5"},o.episode.toLocaleLowerCase()," - ",o.name),n.a.createElement(m.a,{color:"textSecondary",variant:"h6"},"The air date: ",o.air_date),n.a.createElement(m.a,{color:"textPrimary",variant:"h6"},"List of characters who have been seen in the episode:"),t?n.a.createElement(oe.a,null):n.a.createElement("div",null,s.map((function(e){return n.a.createElement(se.a,{variant:"contained",key:e.id,onClick:p,color:"default",className:l.button,component:S.b,to:"/characters/".concat(e.id),size:"large"},n.a.createElement(Nt.a,{alt:"",src:e.image,className:l.avatar}),e.name)})))))},Lt=Object(ot.d)(Object(O.b)((function(e){return{currentEpisode:e.episodes.currentEpisode,isLoading:e.episodes.isLoading,charactersOfCurrentEpisode:e.episodes.charactersOfCurrentEpisode}}),{getCurrentEpisode:function(e){return function(){var t=Object(Te.a)(Se.a.mark((function t(a,r){var n,c,o;return Se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(At(!0)),t.next=3,Ne(e);case 3:return n=t.sent,a(jt(n)),c=n.characters.map((function(e){return Pe(e)})),t.next=8,Promise.all(c);case 8:o=t.sent,a(Pt(o)),a(At(!1));case 11:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},setCurrentItem:I}),D.e)(Ht),Dt=Object(s.a)((function(e){return{content:{flexGrow:1,padding:e.spacing(3)}}})),Ft=function(){var e=Dt();return n.a.createElement("main",{className:e.content},n.a.createElement(l.a,null),n.a.createElement(D.a,{exact:!0,path:"/characters",component:ct}),n.a.createElement(D.a,{path:"/characters/:id",render:function(){return n.a.createElement(St,null)}}),n.a.createElement(D.a,{path:"/locations",component:F}),n.a.createElement(D.a,{exact:!0,path:"/episodes",component:It}),n.a.createElement(D.a,{path:"/episodes/:id",component:Lt}))},Gt=Object(s.a)((function(e){return Object(i.a)({root:{display:"flex"}})})),Ut=function(){var e=Gt();return n.a.createElement("div",{className:e.root},n.a.createElement(d,null),n.a.createElement(L,null),n.a.createElement(Ft,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Bt=a(207),zt=a(428),Mt=Object(ot.c)({form:zt.a,sidebar:N,characters:We,episodes:_t}),Wt=Object(ot.e)(Mt,Object(ot.a)(Bt.a));window.store=Wt;var Jt=Wt;o.a.render(n.a.createElement(S.a,null,n.a.createElement(O.a,{store:Jt},n.a.createElement(Ut,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[222,1,2]]]);
//# sourceMappingURL=main.7dd60a01.chunk.js.map