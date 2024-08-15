import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogView.css';

function BlogView() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        const checkIsAuthor = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}/isAuthor`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                setIsAuthor(response.data);
            } catch (error) {
                console.error("Error checking author:", error);
            }
        };

        fetchBlog();
        checkIsAuthor();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            navigate('/blogs');
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="blog-container">
            <div className="blog-header">
                <h1>{blog.title}</h1>
                {isAuthor && (
                    <div className="kebab-menu" ref={dropdownRef} onClick={() => setShowDropdown(prev => !prev)}>
                        <div>⋮</div>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to={`/blogs/${id}/update`} className="dropdown-item">Edit</Link>
                                <div onClick={handleDelete} className="dropdown-item">Delete</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <p>By {blog.therapist.firstName} {blog.therapist.lastName}</p>
            <img src={blog.image} alt="Blog Cover" className="blog-image" />
            <p className="blog-content">{blog.description}</p>
        </div>
    );
}

export default BlogView;
