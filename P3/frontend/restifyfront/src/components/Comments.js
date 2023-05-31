import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const Comments = ({ prop_id }) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterDate, setFilterDate] = useState('desc');

  useEffect(() => {
    if (prop_id) {
      const fetchComments = async () => {
        try {
          setLoading(true);  
          const response = await axios.get(`http://localhost:8000/comments/addPropertyComment/${prop_id}/`, {
            headers: {
              'Authorization': "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTI4OTk4LCJpYXQiOjE2ODIzMzY5OTgsImp0aSI6IjkzY2NiMGQ5YjZkZTQ1MzI4MzM2NjIxZGYyNTI4ZDQ2IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJzYXNhbiJ9.48NWjioib4FyEuzjsysbdut4zanI3I9aWf03991Qs0c"
              ,
              'Content-Type': 'application/json',
            },
            params: {
              ordering: filterDate === 'desc' ? '-dateMade' : 'dateMade',
              page: page,
              page_size: 6,
            },
          });
          console.log('Response data:', response.data);
          setComments(response.data);
          setTotalPages(response.data.total_pages);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching comments:', error);
          setLoading(false);
        }
      };
      fetchComments();
    }
  }, [prop_id, page, filterDate]);

  const handlePostComment = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/comments/addPropertyComment/${prop_id}/`, {
        content: newComment,
        rating: newRating,
      }, {
        headers: {
          'Authorization': "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTI4OTk4LCJpYXQiOjE2ODIzMzY5OTgsImp0aSI6IjkzY2NiMGQ5YjZkZTQ1MzI4MzM2NjIxZGYyNTI4ZDQ2IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJzYXNhbiJ9.48NWjioib4FyEuzjsysbdut4zanI3I9aWf03991Qs0c"
          ,
          'Content-Type': 'application/json',
        },
      });
      setNewComment('');
      setNewRating(1);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  if(comments == undefined){
    return <>Still loading...</>;
  }
  if(!loading){
    return (
        <div className="comments-container">
        <Card className="comments-card">
            <CardContent>
            <Typography gutterBottom variant="h6">
                Comments
            </Typography>
            <FormControl fullWidth variant="outlined">
                <InputLabel>Filter by date</InputLabel>
                <Select
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                label="Filter by date"
                >
                <MenuItem value="desc">Newest first</MenuItem>
                <MenuItem value="asc">Oldest first</MenuItem>
                </Select>
            </FormControl>
            {loading ? (
            
                <p>Loading comments...</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <Typography variant="body1">
                        {comment.guestName}: {comment.content} (Rating: {comment.rating})
                        </Typography>
                    </div>
            ))
            )}
                <div className="post-comment">
                <TextField
                    label="Your comment"
                    variant="outlined"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    style={{ marginBottom: '16px' }}
                />
                <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
                    <InputLabel>Rating</InputLabel>
                    <Select
                    value={newRating}
                    onChange={e => setNewRating(e.target.value)}
                    label="Rating"
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handlePostComment} variant="contained" color="primary">
                    Post Comment
                </Button>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    style={{ marginBottom: '16px' }}
                />
                </div>
            </CardContent>
            </Card>
        </div>
        );
    }
    return <div>Loading...</div>;
  };
  
  export default Comments;
                
