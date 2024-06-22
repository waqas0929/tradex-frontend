import React from "react";
import "./Footer.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-content">
                <div className="footer-left">
                    <div className="footer-nav">
                        <a href="/about-us">About Us</a>
                        <a href="/contact">Contact</a>
                        <a href="/privacy-policy">Privacy Policy</a>
                    </div>
                </div>
                <div className="footer-center">
                    <p>© 2024 Tradexx, Inc. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <div className="social-media">
                        <a href="https://www.facebook.com/Tradexx21/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="https://www.instagram.com/tradexxkilims/?hl=en" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://api.whatsapp.com/send/?phone=971567629890&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
