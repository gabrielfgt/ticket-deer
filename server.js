const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ticket-deer.vercel.app', 'http://localhost:3001'] // Permitir tanto o frontend em produção quanto local
    : ['http://localhost:3001']
}));
app.use(bodyParser.json());

// In-memory storage
let tickets = [];
let teamMembers = [
  { id: 1, name: 'John Doe', skills: ['JavaScript', 'React', 'Node.js'] },
  { id: 2, name: 'Jane Smith', skills: ['Python', 'Django', 'SQL'] },
  { id: 3, name: 'Mike Johnson', skills: ['Java', 'Spring', 'MongoDB'] },
  { id: 4, name: 'Sarah Williams', skills: ['TypeScript', 'Angular', 'AWS'] },
  { id: 5, name: 'Tom Brown', skills: ['Go', 'Docker', 'Kubernetes'] }
];

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Ticket Deer API is running' });
});

// Routes
app.get('/api/team-members', (req, res) => {
  res.json(teamMembers);
});

app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.post('/api/tickets', (req, res) => {
  const { title, description, deadline, assignedTo } = req.body;
  
  // Find the best matching team member based on skills
  const ticket = {
    id: tickets.length + 1,
    title,
    description,
    deadline,
    assignedTo,
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  tickets.push(ticket);
  res.status(201).json(ticket);
});

app.put('/api/tickets/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const ticket = tickets.find(t => t.id === parseInt(id));
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  ticket.status = status;
  res.json(ticket);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 