(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(5075)}])},7088:function(e,t,s){"use strict";s.d(t,{Z:function(){return p}});var a=s(5893),n=s(1163),i=s(6426),o=s(8006),l=s(2920),c=s(5322),r={src:"/_next/static/media/google-icon.a9d5d5bf.svg",height:512,width:512,blurWidth:0,blurHeight:0},d=s(5675),m=s.n(d),x=s(8407),u=s(9473),b=s(7041);let h=e=>{let{type:t}=e,s=(0,n.useRouter)(),d=(0,u.I0)(),h=(0,i.Nq)({flow:"auth-code",onSuccess:async e=>{let t=await (0,o.d6)(e);t&&200===t.status&&(d((0,x.v)(t.data.data)),(0,b.setCookie)("randomApiKey",t.data.data.randomApiKey),t.data.data.randomApiKey?((0,o.Ds)(t.data.data.phone_number),(0,o.gc)(t.data.data.email,"signup")):(0,b.deleteCookie)("planId"),s.push("/dashboard"),l.Am.success(t.data.message))}});return(0,a.jsxs)(c.Z,{type:"button",btnclass:"google-btn m-top--5x w-100",clickFn:()=>h(),children:[(0,a.jsx)("span",{className:"imge-bx",children:(0,a.jsx)(m(),{src:r,alt:"google-icon",width:16})}),(0,a.jsxs)("span",{className:"btn-content",children:["Sign ","login"===t?"in":"up"," with Google"]})]})};var p=h},5075:function(e,t,s){"use strict";s.r(t);var a=s(5893),n=s(9008),i=s.n(n),o=s(1163),l=s(1664),c=s.n(l),r=s(7041),d=s(7294),m=s(8850),x=s(7088),u=s(9929),b=s(5322),h=s(8006),p=s(682),_=s(4051),g=s(1555),f=s(2914),j=s(2327),w=s.n(j),N=s(2920),v=s(8407),y=s(9473);let k=()=>{let e=(0,o.useRouter)(),t=(0,y.I0)(),[s,n]=(0,d.useState)(!0),[l,j]=(0,d.useState)({email:"",password:""}),k=e=>{let t=e.target.name,s=e.target.value;j(e=>({...e,[t]:s})),l.email.length>0&&l.password.length>0&&n(!1)},Z=async s=>{s.preventDefault(),n(!0);let a=await (0,h.pH)(l);a&&200===a.status&&((0,r.deleteCookie)("planId"),t((0,v.v)(a.data.data)),e.push("/dashboard"),N.Am.success(a.data.message))};return(0,d.useEffect)(()=>{let t=(0,r.getCookie)("token");t&&e.replace("/dashboard")},[]),(0,d.useEffect)(()=>{(null==l?void 0:l.email.length)&&(null==l?void 0:l.password.length)?n(!1):n(!0)},[null==l?void 0:l.email,null==l?void 0:l.password]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i(),{children:[(0,a.jsx)("title",{children:"Op List | Login"}),(0,a.jsx)("meta",{name:"description",content:""}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,a.jsx)("main",{className:w().form_pagebx,children:(0,a.jsx)("div",{className:"".concat(w().mainbx," bg_gradient_blue login_section form_section_outer"),children:(0,a.jsx)(p.Z,{className:"p-0",children:(0,a.jsx)("div",{className:"inner_card-sectionbx bg_gradient_white",children:(0,a.jsxs)(_.Z,{className:"gutter-0x",children:[(0,a.jsx)(g.Z,{md:6,children:(0,a.jsx)(u.Z,{description:"Don't have an account ?",buttonName:"Register"})}),(0,a.jsx)(g.Z,{md:6,children:(0,a.jsxs)("div",{className:"".concat(w().rightcardbx," box_right  d-flex flex-column justify-content-center"),children:[(0,a.jsxs)("div",{className:"".concat(w().innerbx," form_innerbx_main form_innerbx_bg  mx-450w"),children:[(0,a.jsx)("div",{className:"".concat(w().login_head," tite_bar_top fw-700 title_lg p-bottom--15x text-center"),children:"Login"}),(0,a.jsxs)(f.Z,{className:"".concat(w().login_form),onSubmit:Z,children:[(0,a.jsxs)(f.Z.Group,{className:"cstm_formbx m-bottom--6x",controlId:"formBasicEmail",children:[(0,a.jsx)(f.Z.Label,{className:"cstm_labelbx title_sm fw-500",children:"Email Address"}),(0,a.jsx)(m.Z,{class:"cstm_filed_bx",type:"text",name:"email",onChange:k})]}),(0,a.jsxs)(f.Z.Group,{className:"cstm_formbx m-bottom--6x",children:[(0,a.jsx)(f.Z.Label,{className:"cstm_labelbx title_sm fw-500",children:"Password"}),(0,a.jsx)(m.Z,{class:"cstm_filed_bx",type:"password",name:"password",onChange:k})]}),(0,a.jsx)("div",{className:"forgot_box text-end m-bottom--6x",children:(0,a.jsx)(c(),{href:"/forgot-password",className:"title_sm text-link-color text-decoration-none",children:"Forgot Password?"})}),(0,a.jsxs)("div",{className:"btn_regbx p-top--15x",children:[(0,a.jsx)(b.Z,{type:"submit",btnclass:"primary_btn w-100 btn_md btn_animation m-bottom--5x",disabled:s,children:"Login"}),(0,a.jsx)(x.Z,{type:"login"})]})]})]}),(0,a.jsxs)("div",{className:"btn_bx1 mobile-btn p-top--20x mx-450w mobile-show",children:[(0,a.jsx)("p",{className:"title_sm color p-bottom--5x fw-600 text-center",children:"Don't have an account ?"}),(0,a.jsx)(b.Z,{type:"button",btnclass:"primary_btn primary-outline w-100 btn_md",clickFn:()=>e.push("/plan"),children:"Register"})]})]})})]})})})})})]})};t.default=k},8407:function(e,t,s){"use strict";s.d(t,{v:function(){return i}});var a=s(8256),n=s(7041);let i=e=>async t=>{let s=e.token;s&&((0,n.setCookie)("token",s),(0,n.setCookie)("userId",e.id)),t({type:a._.LOGIN_SUCCESS,payload:e})}}},function(e){e.O(0,[62,440,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);