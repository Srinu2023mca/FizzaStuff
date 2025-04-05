import css from "../styles/Footer.module.css";
import { UilFacebook, UilTwitter, UilInstagram } from "@iconscout/react-unicons";
import Image from "next/image";
import Logo from "../assets/Logo.png";

export default function Footer() {
    return (
        <div className={css.container}>
            <span>All Rights Reserved</span>
            
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

                {/* Social Media Links */}
                <div className={css.social}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <UilFacebook size={45} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <UilTwitter size={45} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <UilInstagram size={45} />
                    </a>
                </div>
            </div>

            {/* Logo Section */}
            <div className={css.logo}>
                <Image src={Logo} alt="FizzaStuff Logo" width={32} height={32} />
                <span>FizzaStuff</span>
            </div>
        </div>
    );
}
