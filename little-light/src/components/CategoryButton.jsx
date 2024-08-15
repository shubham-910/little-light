import React from 'react';
import { Button } from '@mui/material';

const CategoryButton = ({ name }) => {
    return <Button variant="outlined" sx={{ margin: '0.5rem' }}>{name}</Button>;
};

export default CategoryButton;
