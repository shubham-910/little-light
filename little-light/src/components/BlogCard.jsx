import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogCard = ({ title, description, imgSrc, date, id }) => {
    return (
        <Card className="card">
            <CardMedia
                component="img"
                className="card-img-top"
                image={imgSrc}
                alt={title}
            />
            <CardContent className="card-body">
                <Typography gutterBottom variant="h5" component="div" className="card-title">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="card-text">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="card-date">
                    {date}
                </Typography>
                <Button size="small" component={Link} to={`/blogs/${id}`} className="btn-primary">
                    Read More
                </Button>
            </CardContent>
        </Card>
    );
};

export default BlogCard;
