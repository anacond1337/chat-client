/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, Container, Typography } from '@mui/material';

function Message({ msg, isMyMessage }) {
  return (
    <Container sx={{
      display: 'flex', alignItems: 'center', flexDirection: isMyMessage ? 'row-reverse' : 'row', my: '0.5rem',
    }}
    >
      <Avatar sx={{ bgcolor: 'green', mx: '0.5rem' }}>{msg.name[0]}</Avatar>
      <Typography>{msg.msg}</Typography>
    </Container>
  );
}

export default Message;
