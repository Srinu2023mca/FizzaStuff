
import css from "../styles/Footer.module.css"
import {UilFacebook,UilGithub,UilInstagram} from "@iconscout/react-unicons"
import Image from "next/image";
import Logo from "../assets/Logo.png";
export default function Footer () {
    return(
        <div className={css.container}>

           <span>All RIght Reserved</span> 
           <div className={css.box}>
                <div className={css.card}>
                    <h1 className={css.title}>WORKING HOURS</h1>
                    <p className={css.text}>
                        MONDAY UNTIL FRIDAY
                        <br /> 9:00 – 22:00
                    </p>
                    <p className={css.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 – 24:00
                    </p>
                </div>
                
                <div className={css.social}>
                    
                    <UilFacebook size={45}/>
                    <UilGithub size={45}/>
                    <UilInstagram size={45}/>
                </div>
           </div>
                       {/* logo side */}
                       <div className={css.logo}>
                <Image src={Logo} alt='' width={50} height={50}/>
                <span>FizzaStuff</span>
            
            </div>

        </div>
    )
};
