const { Event } = require('../models/event');
const Joi = require('joi');
const { validateEvent } = require('../helper/validation'); 

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).send(allEvents);
  } catch (error) {
    res.status(400).send(error); 
  }
};


// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send(error); 
  }
};


// Add an event (ID is provided in the request body)
exports.addEvent = async (req, res) => {
  // Validate event data 
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).send(newEvent);
  } catch (error) {
    res.status(400).send(error); 
  }
};
