const express = require("express");
const Joi = require('joi');
const app = express();
app.use(express.json());

const events = [
  { id: 1, name: 'Event 1', date: '2024-04-01', location: 'Venue 1' },
  { id: 2, name: 'Event 2', date: '2024-04-15', location: 'Venue 2' }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/events', (req, res) => {
  res.send(events);
});

app.get('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(c => c.id === eventId);
  if (!event) {
    res.status(404).send(`Event with ID ${eventId} not found!`);
  } else {
    res.send(event);
  }
});

// DELETE API endpoint
app.delete('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(c => c.id === eventId);

  if (eventIndex === -1) {
    res.status(404).send(`Event with ID ${eventId} not found!`);
  } else {
    events.splice(eventIndex, 1); // Remove event from array
    res.status(200).send(`Event with ID ${eventId} deleted successfully!`);
  }
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body;

  const validationError = validateEvent(newEvent);
  if (validationError) {
    return res.status(400).send(validationError); // Use 400 for bad request
  }

  const event = {
    id: events.length + 1,
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
  };

  events.push(newEvent);
  res.status(201).send('Event added successfully');
  res.send(event);
});

function validateEvent(event) {
  const schema = Joi.object({
    name: Joi.string().required(),
    date: Joi.string().isoDate().required(),
    location: Joi.string().required(),
  });

  const { error } = schema.validate(event);
  return error ? error.details[0].message : null;
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));
