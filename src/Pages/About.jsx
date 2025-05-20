import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button } from '@mui/material';
import styles from "../Styles/About.module.css";

function About() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! We will get back to you shortly.");
    setFormData({ fullname: '', email: '', subject: '', message: '' });
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>

        <Typography variant="h4" gutterBottom align="center" className={styles.title}>
          About Us
        </Typography>
        <Box className={styles.content}>
          <Typography variant="body1" paragraph>
            Canvassly is a book price comparison platform created to help readers find the best book deals across trusted online bookstores like BooksForLess, Fully Booked, and National Book Store. 
            Our mission is to provide reliable, transparent, and convenient price comparisons to empower smarter and more affordable reading choices.
          </Typography>

          <Typography variant="body1" paragraph>
            Founded as a partnership by a team of passionate individuals with backgrounds in technology, e-commerce, and the book industry, Canvassly is committed to continuous improvement and user satisfaction. 
            We prioritize core values such as transparency, convenience, responsibility, and proactive growth.
          </Typography>

          <Typography variant="body1" paragraph>
            The platform is built using modern technologies like React, JavaScript, Python, PostgreSQL, and Firebase, and integrates tools like Selenium, Playwright, and BeautifulSoup for real-time data scraping. 
            We also utilize PayMongo for payment processing and Jest for testing, ensuring a smooth and secure experience.
          </Typography>

          <Typography variant="body1" paragraph>
            Canvassly is designed for young adults and professionals looking for a streamlined, mobile-friendly solution to compare book prices. 
            Through a freemium model, we offer both free access and premium features, while generating revenue from subscriptions and ads.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Meet Our Team:</strong>
            <ul className={styles.teamList}>
              <li><strong>Gian Cedrix M. Afable</strong> – CEO, leading strategic decisions and operations.</li>
              <li><strong>Almira M. Osorio</strong> – IT Manager, overseeing system stability and development.</li>
              <li><strong>France Bernard M. Casalme</strong> – Software Developer, building and maintaining the platform.</li>
              <li><strong>Marion Miguel R. San Jose</strong> – Marketing/Finance, managing outreach and financial planning.</li>
              <li><strong>John Ross Winn D. Mariano</strong> – Customer Service, supporting users and ensuring a positive experience.</li>
            </ul>
          </Typography>

          <Typography variant="body1" paragraph>
            With over 85% user satisfaction and a growing digital presence, we’re committed to making book shopping smarter, easier, and more cost-effective. Thank you for being part of our journey.
          </Typography>
        </Box>

   
        <Box className={styles.contactSection}>
          <Typography variant="h5" gutterBottom className={styles.contactTitle}>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            We'd love to hear from you! Whether you have questions, feedback, or partnership opportunities, feel free to reach out:
          </Typography>
          
          <ul className={styles.contactList}>
          <li><strong>Facebook:</strong> <a href="https://facebook.com/Canvassly" target="_blank" rel="noopener noreferrer">Canvassly</a></li>
          <li><strong>Instagram:</strong> <a href="https://instagram.com/canvassly" target="_blank" rel="noopener noreferrer">@canvassly</a></li>
          <li><strong>Email:</strong> <a href="mailto:canvassly@gmail.com">canvassly@gmail.com</a></li>
          <li><strong>Phone:</strong> <a href="tel:+639673402792">0967-340-2792</a></li>
        </ul>

  
          <Typography variant="h6" gutterBottom className={styles.formTitle}>
            Send Us a Message
          </Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <TextField
              label="Your Message"
              variant="outlined"
              fullWidth
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.input}
              multiline
              rows={4}
              required
            />
            <Button variant="contained" type="submit" className={styles.button}>
              Send Message
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default About;
