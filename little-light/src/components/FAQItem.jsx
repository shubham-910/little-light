import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQItem = ({ question, answer }) => {
  return (
    <Accordion sx={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: '#f8f9fa',
          '&.Mui-expanded': {
            minHeight: '48px',
          },
        }}
      >
        <Typography 
          sx={{ 
            fontWeight: 'bold', 
            fontSize: '1.25rem', 
            color: '#000', // Changing font color to black
            fontFamily: 'Poppins, Arial, sans-serif' // Changing font family
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '1rem',
          backgroundColor: '#fff',
        }}
      >
        <Typography 
          sx={{ 
            color: '#000', // Changing font color to black
            fontFamily: 'Poppins, Arial, sans-serif' // Changing font family
          }}
        >
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQItem;
