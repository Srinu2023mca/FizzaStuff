import { Modal , useMantineTheme } from "@mantine/core";
import css from "../styles/OrderModal.module.css";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import { toast, Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

export default function OrderModal({opened, setOpened,PaymentMethod}) {
    const CartData = useStore((state) => state.cart);
    const selectedTable = CartData?.tables;

    const theme = useMantineTheme();
    const router = useRouter();
    const total = typeof window !== 'undefined' && localStorage.getItem('total')
    const [FormData, setFormData] = useState({})
    const handleInput = (e) =>{
        setFormData({...FormData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=> {
        e.preventDefault();
        //console.log(FormData);
        const id = await createOrder({...FormData,total,PaymentMethod})
        toast.success('Order Placed ');
        resetCart();
        {
            typeof window !== 'undefined' && localStorage.setItem('order',id)   
        }
        router.push(`/order/${id}`)
    };

    const resetCart = useStore((state)=>state.resetCart);
    return(
        <Modal overlayColor={
            theme.colorScheme==="dark" ?theme.colors.dark[9] : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened} 
        onClose={()=>setOpened(null)}
        >
        {/* Modal content */}
        <form className={css.formContainer} onSubmit={handleSubmit}>
            <input type="text" name="name" required placeholder="Enter Your Name" onChange={handleInput}/>
            <input type="text" name="phone" required placeholder="Enter Your Phone Number" onChange={handleInput}/>
            {/* <input type="text" name="tableNo"  onChange={handleInput} className={css.address}/> */}
            <textarea name="tableNo" id="" rows="3" placeholder="Enter your Address or Table No" onChange={handleInput} value={selectedTable?`Table ${selectedTable}`:""}></textarea> 
            <span>You will pay <span>₹{total} </span>on Delivery</span>
            <button type="submit" className="btn">Place Order</button>
        </form>
        <Toaster/>
      </Modal>

    );
}