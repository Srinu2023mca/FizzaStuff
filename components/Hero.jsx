import css from "../styles/Hero.module.css";
import Image from "next/image";
import Cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import {UilPhone} from "@iconscout/react-unicons"
import Pizza1 from "../assets/p1.jpg"
import Link from "next/link";
export default function Hero() {
    return(
        <div className={css.container}>
            {/* left side */}
            <div className={css.left}>
                <div className={css.cherryDiv}>
                    <span>More then Faster</span>
                    <Image src={Cherry} alt=""width={40} height={25} />
                </div>
            
                <div className={css.heroText}>

                    <span>Be The Faster</span>
                    <span>In Delivering</span>
                    <span>
                        Your<span style={{color:"var(--themeRed)"}}> Pizza</span> 
                    </span>
                </div>
                <span className={css.miniText}>
                    Our Mission is to filling Your Tummy with delicious Food and With fast and free delivery
                </span>

                {/* <button className={'btn ${css.btn}'}>Get Started</button> */}
            </div>

            {/* right side */}
            
            <div className={css.right}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="" layout="intrinsic"/>
                </div>

                
                <div className={css.pizza}>
                    <div>
                        <Image src={Pizza1} alt="" objectFit="cover" layout="intrinsic"/>
                    </div>
                    <div className={css.details}>
                        <span>Italian Pizza</span>
                        <span><span style={{color:"var(--themeRed)"}}>₹</span>450</span>
                    </div>

                </div> 
            </div>
        </div>
    )
}