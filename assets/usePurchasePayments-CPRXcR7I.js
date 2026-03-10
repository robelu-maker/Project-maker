import{u}from"./AppLayout-N2oMi82g.js";import{g as _,e as y,s}from"./index-DbAdtEKx.js";import{u as g}from"./useMutation-0yy9Fe3u.js";function b(t){return u({queryKey:["paymentTransactions",t],queryFn:async()=>{if(!t)return[];const{data:e,error:a}=await s.from("payment_transactions").select("*").eq("sale_id",t).order("payment_date",{ascending:!1});if(a)throw a;return e},enabled:!!t})}function v(){const t=_();return g({mutationFn:async({saleId:e,amount:a,paymentMethod:n,notes:r})=>{const{data:{user:o}}=await s.auth.getUser();if(!o)throw new Error("User not authenticated");const{data:i,error:c}=await s.from("sales").select("total_amount, amount_paid, payment_status, customer_id").eq("id",e).single();if(c)throw c;if(!i)throw new Error("Sale not found");const d=Number(i.amount_paid)+Number(a),l=Number(i.total_amount);if(d>l)throw new Error("Payment amount exceeds outstanding balance");const f=d>=l?"paid":i.payment_status,{data:h,error:m}=await s.from("payment_transactions").insert({sale_id:e,amount:Number(a),payment_method:n||"cash",notes:r,recorded_by:o.id}).select().single();if(m)throw m;return{transaction:h,newPaymentStatus:f}},onSuccess:(e,a)=>{y.success("Payment recorded successfully"),t.invalidateQueries({queryKey:["paymentTransactions",a.saleId]}),t.invalidateQueries({queryKey:["sales"]}),t.invalidateQueries({queryKey:["outstandingBalances"]}),t.invalidateQueries({queryKey:["salesWithOutstanding"]}),t.invalidateQueries({queryKey:["customers"]}),t.invalidateQueries({queryKey:["dashboard-stats"]})},onError:e=>{y.error(e.message||"Failed to record payment")}})}function O(){return u({queryKey:["outstandingBalances"],queryFn:async()=>{const{data:t,error:e}=await s.from("sales").select("total_amount, amount_paid, payment_status, outstanding_balance");if(e)throw e;const a={totalCredit:0,totalAdvance:0,totalOutstanding:0,creditCount:0,advanceCount:0};return t.forEach(n=>{const r=Number(n.outstanding_balance)||0;n.payment_status==="credit"&&r>0?(a.totalCredit+=r,a.creditCount++):n.payment_status==="advance"&&r>0&&(a.totalAdvance+=r,a.advanceCount++)}),a.totalOutstanding=a.totalCredit+a.totalAdvance,a},refetchInterval:3e4})}function K(t){return u({queryKey:["salesWithOutstanding",t],queryFn:async()=>{let e=s.from("sales").select(`
          *,
          customers (
            id,
            name,
            phone,
            email
          )
        `).gt("outstanding_balance",0).order("created_at",{ascending:!1});t&&t!=="all"&&(e=e.eq("payment_status",t));const{data:a,error:n}=await e;if(n)throw n;return a}})}function S(t){return u({queryKey:["allSalesTransactions",t?.from?.toISOString(),t?.to?.toISOString(),t?.searchTerm],queryFn:async()=>{let e=s.from("payment_transactions").select(`
                    *,
                    sales (
                        receipt_number,
                        total_amount,
                        customers (
                            name
                        )
                    )
                `,{count:"exact"});if(t?.from&&(e=e.gte("payment_date",t.from.toISOString())),t?.to&&(e=e.lte("payment_date",t.to.toISOString())),t?.searchTerm&&t.searchTerm.trim().length>0){const o=t.searchTerm.trim();e=e.or(`notes.ilike.%${o}%`)}const{data:a,error:n,count:r}=await e.order("payment_date",{ascending:!1});if(n)throw n;return{data:a,count:r}}})}function T(t){return u({queryKey:["purchaseTransactions",t],queryFn:async()=>{if(!t)return[];const{data:e,error:a}=await s.from("purchase_transactions").select("*").eq("purchase_id",t).order("payment_date",{ascending:!1});if(a)throw a;return e},enabled:!!t})}function C(){const t=_();return g({mutationFn:async({purchaseId:e,amount:a,paymentMethod:n,notes:r})=>{const{data:{user:o}}=await s.auth.getUser();if(!o)throw new Error("User not authenticated");const{data:i,error:c}=await s.from("purchases").select("total_amount, amount_paid, payment_status, supplier_id").eq("id",e).single();if(c)throw c;if(!i)throw new Error("Purchase not found");const d=Number(i.amount_paid||0)+Number(a),l=Number(i.total_amount);if(d>l)throw new Error("Payment amount exceeds outstanding balance");const f=d>=l?"paid":i.payment_status,{data:h,error:m}=await s.from("purchase_transactions").insert({purchase_id:e,amount:Number(a),payment_method:n||"cash",notes:r,recorded_by:o.id}).select().single();if(m)throw m;return{transaction:h,newPaymentStatus:f}},onSuccess:(e,a)=>{y.success("Supplier payment recorded"),t.invalidateQueries({queryKey:["purchaseTransactions",a.purchaseId]}),t.invalidateQueries({queryKey:["purchases"]}),t.invalidateQueries({queryKey:["supplierOutstanding"]}),t.invalidateQueries({queryKey:["purchasesWithOutstanding"]}),t.invalidateQueries({queryKey:["suppliers"]}),t.invalidateQueries({queryKey:["dashboard-stats"]})},onError:e=>{y.error(e.message||"Failed to record payment")}})}function P(){return u({queryKey:["supplierOutstanding"],queryFn:async()=>{const{data:t,error:e}=await s.from("purchases").select("total_amount, amount_paid, payment_status, outstanding_balance");if(e)throw e;const a={totalCredit:0,totalAdvance:0,totalOutstanding:0,creditCount:0,advanceCount:0};return t.forEach(n=>{const r=Number(n.outstanding_balance)||0;n.payment_status==="credit"&&r>0?(a.totalCredit+=r,a.creditCount++):n.payment_status==="advance"&&r>0&&(a.totalAdvance+=r,a.advanceCount++)}),a.totalOutstanding=a.totalCredit+a.totalAdvance,a},refetchInterval:3e4})}function E(t){return u({queryKey:["purchasesWithOutstanding",t],queryFn:async()=>{let e=s.from("purchases").select(`
                    *,
                    suppliers (
                        id,
                        name,
                        phone
                    )
                `).gt("outstanding_balance",0).order("created_at",{ascending:!1});t&&t!=="all"&&(e=e.eq("payment_status",t));const{data:a,error:n}=await e;if(n)throw n;return a}})}function Q(t){return u({queryKey:["allPurchaseTransactions",t?.from?.toISOString(),t?.to?.toISOString(),t?.searchTerm],queryFn:async()=>{let e=s.from("purchase_transactions").select(`
                    *,
                    purchases (
                        receipt_number,
                        total_amount,
                        suppliers (
                            name
                        )
                    )
                `,{count:"exact"});if(t?.from&&(e=e.gte("payment_date",t.from.toISOString())),t?.to&&(e=e.lte("payment_date",t.to.toISOString())),t?.searchTerm&&t.searchTerm.trim().length>0){const o=t.searchTerm.trim();e=e.or(`notes.ilike.%${o}%`)}const{data:a,error:n,count:r}=await e.order("payment_date",{ascending:!1});if(n)throw n;return{data:a,count:r}}})}export{P as a,v as b,b as c,C as d,T as e,K as f,E as g,S as h,Q as i,O as u};
