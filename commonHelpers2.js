import"./assets/styles-1448556a.js";import{i}from"./assets/vendor-77e16229.js";document.querySelector(".form").addEventListener("submit",o);function o(s){s.preventDefault();const t=s.target.elements.delay.value,r=s.target.elements.state.value;new Promise((e,m)=>{setTimeout(r==="fulfilled"?()=>e(t):()=>m(t),t)}).then(e=>{i.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})},e=>{i.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})}
//# sourceMappingURL=commonHelpers2.js.map
