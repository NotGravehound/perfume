import React from "react";
import "./css/ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-layout">
      <div className="contact-left">
        <h1>LET’S GET<br /><span>IN TOUCH</span></h1>
        <p className="subhead">Don’t be afraid to say hello with us!</p>

        <div className="contact-info">
          <p><strong>Phone</strong><br />(+2) 578-365-379</p>
          <p><strong>Email</strong><br />ContactUs@aromenore.com</p>
          <p><strong>Office</strong><br />
            230 Norman Street New York,<br />QC (USA) H8R 1A1
          </p>
        </div>
      </div>

      <div className="contact-right">
        <div className="form-intro">
          <div className="intro-text">
            <p>
              Great! We're excited to hear from you and let's start something special together.
              <br />
              Call us for any inquiry.
            </p>
          </div>
        </div>

        <div className="contact-box">
          <h3>Contact</h3>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Phone" />
              <input type="text" placeholder="Subject" />
            </div>
            <textarea placeholder="Tell us about your interested in" rows="5"></textarea>
            <div className="button-center">
              <button type="submit">Send to us</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
