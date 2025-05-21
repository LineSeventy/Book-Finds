import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button } from '@mui/material';
import styles from "../Styles/About.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';


function About() {

useEffect(() => {
  AOS.init({ duration: 800, once: true });
}, []);
  
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
    alert("Message sent! We will get back to you shortly.");
    setFormData({ fullname: '', email: '', subject: '', message: '' });
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      
      {/* SECTION 1: About (full width), Team (card), Contact Us (card) */}
  
<Box className={styles.gridSection}>
  <Box className={styles.aboutFull} data-aos="fade-up">
          <Typography variant="h4" className={styles.title}>About Us</Typography>

          <Typography variant="body1" className={styles.paragraph}>
            Canvassly is a book price comparison platform designed to help readers find the best deals across multiple online bookstores, including booksforless.ph, fullybookedonline.com, and Nationalbookstore.com. With a mission to provide reliable price comparisons and user convenience, Canvassly also offers customer reviews to help users make informed purchasing decisions. Guided by its core values of transparency, convenience, responsibility, and proactive growth, the platform ensures honest pricing, a seamless user experience, and continuous improvements. Canvassly is structured as a partnership, allowing multiple owners to collaborate, share responsibilities, and leverage their expertise in technology, e-commerce, and the book industry. Users can access Canvassly through various devices with an internet connection, and they can stay connected through the platform’s social media accounts and customer support.
          </Typography>

          <Typography variant="body1" className={styles.paragraph}>
            The platform is built using modern technologies, including JavaScript and Python, with frameworks such as React and Material UI. It operates on a PostgreSQL database and utilizes Firebase and PayMongo APIs for data integration. Tools like Jest are used for testing and debugging. And Playwright Node.js, Selenium and BeautifulSoup are used for web scraping. To maintain efficiency, Canvassly implements structured IT management practices, including customer support to address issues proactively. The team also focuses on long- term growth by adopting a flexible software structure and staying updated with emerging technologies like the Internet of Things.
          </Typography>
        </Box>
    
  <Box className={styles.rightStack}>
        <Paper elevation={3} className={styles.teamRight} data-aos="fade-left">
          <Typography variant="h5" className={styles.teamTitle}>Meet Our Team</Typography>
          <ul className={styles.teamList}>
            <li><strong>Gian Cedrix M. Afable</strong> – CEO, leading strategic decisions and operations.</li>
            <li><strong>Almira M. Osorio</strong> – IT Manager, overseeing system stability and development.</li>
            <li><strong>France Bernard M. Casalme</strong> – Software Developer, building and maintaining the platform.</li>
            <li><strong>Marion Miguel R. San Jose</strong> – Marketing/Finance, managing outreach and financial planning.</li>
            <li><strong>John Ross Winn D. Mariano</strong> – Customer Service, supporting users and ensuring a positive experience.</li>
          </ul>
        </Paper>

        <Paper elevation={3} className={styles.contactCard} data-aos="fade-left">
          <Typography variant="h5" className={styles.contactTitle}>Contact Us</Typography>
          <Typography variant="body1" paragraph>
            We'd love to hear from you! Reach out to us via:
          </Typography>
          <ul className={styles.contactList}>
            <li><strong>Facebook:</strong> <a href="https://facebook.com/Canvassly" target="_blank" rel="noopener noreferrer">Canvassly</a></li>
            <li><strong>Instagram:</strong> <a href="https://instagram.com/canvassly" target="_blank" rel="noopener noreferrer">@canvassly</a></li>
            <li><strong>Email:</strong> <a href="mailto:canvassly@gmail.com">canvassly@gmail.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+639673402792">0967-340-2792</a></li>
          </ul>
        </Paper>
        </Box>
      </Box>


      <Box className={styles.section}>
        <Paper elevation={3} className={styles.rightCard} data-aos="fade-up">
          <Typography variant="h6" className={styles.formTitle}>Send Us a Message</Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} fullWidth variant="outlined" required />
            <TextField label="Email Address" name="email" value={formData.email} onChange={handleChange} fullWidth variant="outlined" type="email" required />
            <TextField label="Subject" name="subject" value={formData.subject} onChange={handleChange} fullWidth variant="outlined" required />
            <TextField label="Your Message" name="message" value={formData.message} onChange={handleChange} fullWidth variant="outlined" multiline rows={4} required />
            <Button type="submit" variant="contained" className={styles.button}>Send Message</Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default About;
