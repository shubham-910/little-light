import React from 'react';
import FAQItem from '../components/FAQItem'; // Adjust the path if necessary
import { Container, Box, Typography, Paper } from '@mui/material';

const FAQPage = () => {
  const faqs = [
    {
      question: 'How do I register for an account?',
      answer: 'To register for an account, navigate to the registration page and fill out the required information.'
    },
    {
      question: 'How do I update my profile information?',
      answer: 'You can update your profile information by navigating to the profile page and selecting the edit option.'
    },
    {
      question: 'How can I contact support?',
      answer: 'For any support-related queries, please email us at support@littlelight.com or call us at XXX-XXX-XXXX.'
    },
    {
        question:'How to write a blog?',
        answer:'Go to Blogs link, and write the blog there, you can include the images and write about 500 words of blog.'
    }
    ,{
        question:'How to connect with therapist?',
        answer:'You can connect to therapist directly, search the therapist near to your area,or the name of the therapist you want to connect, then you can message them and meet in person or online.'
    },{
        question:'How to listen to music?',
        answer:'On this application, you can go to the navbar to music, in music page, you will find different mood type of music, which you can listen for free by pressing paly.'
    }
  ];

  return (
    <Container>
      <Box my={5}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{
            fontFamily: 'Poppins, Arial, sans-serif', // Changing font family
            color: '#000', // Changing font color to black
            marginBottom: '2rem',
            textAlign: 'center'
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Paper elevation={3} sx={{ padding: '2rem', marginBottom: '2rem' }}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default FAQPage;
