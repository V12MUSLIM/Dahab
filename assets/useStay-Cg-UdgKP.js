import{c as t,u as e}from"./index-Di3fJSRz.js";const r=async()=>{const a=await t.get("/stay");return a.data?.stays?a.data.stays.flatMap(s=>s.stays||[]):(console.error("Unexpected response format:",a.data),[])},o=()=>e({queryKey:["stays"],queryFn:r});export{o as u};
//# sourceMappingURL=useStay-Cg-UdgKP.js.map
