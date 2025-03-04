import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

import sparkMarketplaceLogo from "../assets/home/sparkMarketplace-logo.png";

import analyticsImage from "../assets/home/analytics-image.png";

import monetization10 from "../assets/home/monetization10.png";
import monetization20 from "../assets/home/monetization20.png";
import monetization30 from "../assets/home/monetization30.png";
import monetization40 from "../assets/home/monetization40.png";
import monetization4560 from "../assets/home/monetization4560.png";

import contentImg1 from "../assets/home/content1.png";
import contentImg2 from "../assets/home/content2.png";
import contentImg3 from "../assets/home/content3.png";

import customerIcon from "../assets/home/customer-icon.png";

import greenUserIcon from "../assets/home/green-user-icon.png";

import audiomackIcon from "../assets/home/audiomack-icon.png";
import bandsintownIcon from "../assets/home/bandsintown-icon.png";
import bonfireIcon from "../assets/home/bonfire-icon.png";
import booksIcon from "../assets/home/books-icon.png";
import buyMeAGiftIcon from "../assets/home/buy-me-a-gift-icon.png";
import cameoIcon from "../assets/home/cameo-icon.png";
import clubhouseIcon from "../assets/home/clubhouse-icon.png";
import communityIcon from "../assets/home/community-icon.png";
import contactDetailsIcon from "../assets/home/contact-details-icon.png";

import twitterIcon from "../assets/home/twitter-icon.png";
import tiktokIcon from "../assets/home/tiktok-icon.png";
import instagramIcon from "../assets/home/instagram-icon.png";
import youtubeIcon from "../assets/home/youtube-icon.png";

const Home = () => {
  return (
    <div className="home-container">
      <header className="top-bar">
        {/* Logo at the left */}
        <img
          src={sparkMarketplaceLogo}
          alt="SparkMarketplace Logo"
          className="top-bar-logo"
        />
        {/* Sign up free button at right */}
        <Link to="/auth-start" className="signup-button">
          Sign up free
        </Link>
      </header>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">
            The easiest place to update and share your Connection
          </h1>
          <p className="hero-subtitle">
            Help your followers discover everything you have to offer, all in
            one convenient place.
          </p>
          <Link to="/auth-start" className="hero-cta">
            Get Your free Spark
          </Link>
        </div>
        <div className="hero-image-container">
          <img
            src={analyticsImage}
            alt="Analytics"
            className="hero-analytics-img"
          />
        </div>
      </section>

      <section className="monetization-section">
        <div className="monetization-left">
          <div className="monetization-images">
            <img src={monetization10} alt="$10" className="chart-image" />
            <img src={monetization20} alt="$20" className="chart-image" />
            <img src={monetization30} alt="$30" className="chart-image" />
            <img src={monetization40} alt="$40" className="chart-image" />
            <img src={monetization4560} alt="$4560" className="chart-image" />
          </div>
          <p className="monetization-subtext">
            Sell products and collect payments. It’s monetization made simple.
          </p>
        </div>
        <div className="monetization-right">
          <h2>Analyze your audience and keep your followers engaged</h2>
          <p>
            Track your engagement in real time, monitor revenue and learn what’s
            working for your audience. Make informed updates on the fly to keep
            them coming back.
          </p>
        </div>
      </section>
      <section className="limitless-section">
        <div className="limitless-left">
          <h2>Share limitless content in limitless ways</h2>
          <p>
            Connect your content in all its forms and help followers find more
            of what they're looking for: TikTok, tweets, YouTube videos, music,
            articles, recipes, podcasts, and more. It all comes together in one
            powerful place.
          </p>
        </div>
        <div className="limitless-right">
          <div className="limitless-images-box">
            <div className="limitless-images">
              <img src={contentImg1} alt="Content 1" />
              <img src={contentImg2} alt="Content 2" />
              <img src={contentImg3} alt="Content 3" className="full-display" />
            </div>
            <p className="limitless-subtext">
              Share your content in limitless ways on your Spark.
            </p>
          </div>
        </div>
      </section>
      <section className="customer-stories-section">
        <div className="customer-left">
          <h2 className="customer-heading">
            Here’s what our <span className="green-text">customer</span> has to
            say
          </h2>

          <Link to="/some-customer-stories-page" className="read-stories-btn">
            Read customer stories
          </Link>
        </div>
        <div className="customer-right">
          <img
            src={customerIcon}
            alt="Customer Icon"
            className="customer-icon"
          />
        </div>
        <p className="customer-description">
          Short describing pitch in here, <br />
          lorem ipsum a placeholder text to demonstrate
        </p>
      </section>
      <section className="testimonials-grid-section">
        <div className="testimonials-grid">
          {/* Card 1 */}
          <div className="testimonial-card">
            <h3 className="testimonial-title">Amazing tool! Saved me months</h3>
            <p className="testimonial-paragraph">
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className="testimonial-user">
              <img src={greenUserIcon} alt="User Icon" className="user-icon" />
              <div>
                <p className="user-name">John Master</p>
                <p className="user-title">Director, Spark.com</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="testimonial-card">
            <h3 className="testimonial-title">Amazing tool! Saved me months</h3>
            <p className="testimonial-paragraph">
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className="testimonial-user">
              <img src={greenUserIcon} alt="User Icon" className="user-icon" />
              <div>
                <p className="user-name">John Master</p>
                <p className="user-title">Director, Spark.com</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="testimonial-card">
            <h3 className="testimonial-title">Amazing tool! Saved me months</h3>
            <p className="testimonial-paragraph">
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className="testimonial-user">
              <img src={greenUserIcon} alt="User Icon" className="user-icon" />
              <div>
                <p className="user-name">John Master</p>
                <p className="user-title">Director, Spark.com</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="testimonial-card">
            <h3 className="testimonial-title">Amazing tool! Saved me months</h3>
            <p className="testimonial-paragraph">
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure it’s 100% true and
              meaningful.
            </p>
            <div className="testimonial-user">
              <img src={greenUserIcon} alt="User Icon" className="user-icon" />
              <div>
                <p className="user-name">John Master</p>
                <p className="user-title">Director, Spark.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="integrations-section">
        <h2 className="integrations-heading">All Link Apps and Integrations</h2>
        <div className="integrations-grid">
          {/* Example of 9 items - adjust or add more as needed */}
          <div className="integration-item">
            <img
              src={audiomackIcon}
              alt="Audiomack"
              className="integration-icon"
            />
            <div className="integration-info">
              <h4>Audiomack</h4>
              <p>Add an Audiomack player to your Linktree</p>
            </div>
          </div>

          <div className="integration-item">
            <img
              src={bandsintownIcon}
              alt="Bandsintown"
              className="integration-icon"
            />
            <div className="integration-info">
              <h4>Bandsintown</h4>
              <p>Drive ticket sales by listing your events</p>
            </div>
          </div>

          <div className="integration-item">
            <img src={bonfireIcon} alt="Bonfire" className="integration-icon" />
            <div className="integration-info">
              <h4>Bonfire</h4>
              <p>Display and sell your custom merch</p>
            </div>
          </div>

          <div className="integration-item">
            <img src={booksIcon} alt="Books" className="integration-icon" />
            <div className="integration-info">
              <h4>Books</h4>
              <p>Promote books on your Linktree</p>
            </div>
          </div>

          <div className="integration-item">
            <img
              src={buyMeAGiftIcon}
              alt="Buy Me A Gift"
              className="integration-icon"
            />
            <div className="integration-info">
              <h4>Buy Me A Gift</h4>
              <p>Let visitors support you with a small gift</p>
            </div>
          </div>

          <div className="integration-item">
            <img src={cameoIcon} alt="Cameo" className="integration-icon" />
            <div className="integration-info">
              <h4>Cameo</h4>
              <p>Make impossible fan connections possible</p>
            </div>
          </div>

          <div className="integration-item">
            <img
              src={clubhouseIcon}
              alt="Clubhouse"
              className="integration-icon"
            />
            <div className="integration-info">
              <h4>Clubhouse</h4>
              <p>Let your community in on the conversation</p>
            </div>
          </div>

          <div className="integration-item">
            <img
              src={communityIcon}
              alt="Community"
              className="integration-icon"
            />
            <div className="integration-info">
              <h4>Community</h4>
              <p>Let an SMS subscriber list grow</p>
            </div>
          </div>

          <div className="integration-item">
            <img
              src={contactDetailsIcon}
              alt="Contact Details"
              className="integration-icon"
            />
            <div className="integration-info">
              <h4>Contact Details</h4>
              <p>Easily share downloadable contact details</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="home-footer-section">
        <div className="footer-container">
          <div className="footer-top-row">
            {/* 1. Buttons (Log in / Sign up free) */}
            <div className="footer-buttons">
              <Link to="/login" className="footer-login-btn">
                Log in
              </Link>
              <Link to="/auth-start" className="footer-signup-btn">
                Sign up free
              </Link>
            </div>

            {/* 2. Footer Links */}
            <div className="footer-links-row">
              <ul>
                <li>About Spark</li>
                <li>Blog</li>
                <li>Press</li>
                <li>Social Good</li>
                <li>Contact</li>
              </ul>
              <ul>
                <li>Careers</li>
                <li>Getting Started</li>
                <li>Features and How Tos</li>
                <li>FAQs</li>
              </ul>
              <ul>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
                <li>Cookie Notice</li>
                <li>Trust Center</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="footer-acknowledgment">
              We acknowledge the Traditional Custodians of the land on which our
              office stands, The Wurundjeri
              <br /> people of the Kulin Nation, and pay our respects to Elders
              past, present and emerging.
            </p>

            <div className="footer-socials">
              <img src={twitterIcon} alt="Twitter" />
              <img src={instagramIcon} alt="Instagram" />
              <img src={youtubeIcon} alt="YouTube" />
              <img src={tiktokIcon} alt="TikTok" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
