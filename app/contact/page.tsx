"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Clock, Instagram, Facebook, Twitter } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 text-balance">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have questions about our handmade spiritual products? We'd love to hear from you. Reach out for custom
            orders, wholesale inquiries, or just to say namaste.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Send us a message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-accent-foreground font-medium">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Contact Information</h2>
                <p className="text-muted-foreground text-lg mb-8 text-pretty">
                  We're here to help with any questions about our handmade candles, dhup, decorations, and handbags.
                  Reach out through any of these channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                      <a href="mailto:info@krishnacrafts.com" className="text-accent hover:underline">
                        info@krishnacrafts.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                      <a href="tel:+919876543210" className="text-accent hover:underline">
                        +91 98765 43210
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Mon-Sat, 9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Visit Our Workshop</h3>
                      <p className="text-muted-foreground">
                        123 Spiritual Lane
                        <br />
                        Vrindavan, Uttar Pradesh 281121
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {/* <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background p-3 rounded-lg hover:bg-accent/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-accent" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background p-3 rounded-lg hover:bg-accent/10 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-accent" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background p-3 rounded-lg hover:bg-accent/10 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6 text-accent" />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Find Our Workshop</h2>
            <p className="text-muted-foreground text-lg">
              Visit us to see our handmade products being crafted with devotion
            </p>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8234567890123!2d77.6789012!3d27.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM0JzA0LjQiTiA3N8KwNDAnNDQuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Workshop Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do you accept custom orders?",
                a: "Yes! We love creating custom pieces. Contact us with your requirements and we'll work with you to create something special.",
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for unused items in original packaging. Handmade items are crafted with care, so please contact us if you have any concerns.",
              },
              {
                q: "Do you offer wholesale pricing?",
                a: "Yes, we offer wholesale pricing for bulk orders. Please contact us with your requirements for a custom quote.",
              },
              {
                q: "How long does shipping take?",
                a: "Domestic orders typically arrive within 5-7 business days. International shipping takes 10-15 business days depending on location.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors group"
              >
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4 text-pretty">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
