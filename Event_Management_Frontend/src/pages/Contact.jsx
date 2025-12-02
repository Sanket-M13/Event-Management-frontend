import "./contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="contact-wrapper">

      <div className="contact-left">
        <div className="contact-left-content">

          <h2 className="contact-title">Contact Information</h2>
          <p className="contact-desc">We’re here to help you. Reach out anytime.</p>

          <div className="contact-info-box">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Address</h4>
              <p>
                EventHub Corporate Office<br />
                8th Floor, Business Center,<br />
                Pune, Maharashtra 411001
              </p>
            </div>
          </div>

          <div className="contact-info-box">
            <FaPhone className="icon" />
            <div>
              <h4>Phone</h4>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
          </div>

          <div className="contact-info-box">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <a href="mailto:support@eventhub.com">support@eventhub.com</a>
            </div>
          </div>

        </div>
      </div>

      <div className="contact-right">
        <h2 className="form-title">Send Us A Message</h2>

        <form className="contact-form">
          <div className="row">
            <div className="col">
              <input type="text" placeholder="First Name" />
            </div>

            <div className="col">
              <input type="text" placeholder="Last Name" />
            </div>
          </div>

          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Phone Number" />
          <textarea rows="4" placeholder="Write your message"></textarea>

          <button className="send-btn">Send Message</button>
        </form>
      </div>

    </div>
  );
}
