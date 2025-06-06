import { useRef, useState } from "react";
import TitleHeader from "../components/TitleHeader";
import emailjs from "@emailjs/browser"

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address:"",
    message: "",
    number:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    console.log("Form submitted:", form);

    try {
        await emailjs.sendForm(
            import.meta.env.VITE_APP_EMAILJS,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATEID,
            formRef.current,
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID,
        )
    } catch (error) {
        console.error(`EMAIL JS ERROR as ${error}`)
    } 

    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", address:"", message: "", number:"" });
    }, 1000);
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5 h-full">
            <div className="flex-center card-border rounded-xl p-10 h-full">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="number">Your Number</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={form.number}
                    onChange={handleChange}
                    placeholder="What’s your phone number?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address">Your Address</label>
                  <input
                    type="address"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="What’s your Address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <p>
                    Otherwise, CALL US 438 855 0271
                  </p>
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <img src="/images/waiting.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
