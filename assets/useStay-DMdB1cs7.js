import{c as e,u as r}from"./index-BihzpQvp.js";const y=async()=>{const a=await e.get("/stay"),s=a.data?.stay||a.data?.stays;return Array.isArray(s)?s.flatMap(t=>t.stays||[]):(console.error("Unexpected response format:",a.data),[])},c=()=>r({queryKey:["stays"],queryFn:y});export{c as u};
//# sourceMappingURL=useStay-DMdB1cs7.js.map
