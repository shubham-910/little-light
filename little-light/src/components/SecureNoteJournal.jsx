import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const SecureNoteJournal = () => {
    const CenteredTypography = styled(Typography)(({ theme }) => ({
        textAlign: 'left',
        fontSize: '1rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem',
        },
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2.5)
    }));

    const CustomContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'left',
        height: '25vh',
    }));

    const InlineBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
    }));

    return (
        <CustomContainer>
            <InlineBox>
                <LockIcon />
                <CenteredTypography variant="body1" paragraph>
                    Your data is secure with us.
                </CenteredTypography>
            </InlineBox>
        </CustomContainer>
    );
}

export default SecureNoteJournal;
