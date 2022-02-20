import express from 'express';
import cors from 'cors';
import { settings } from './app/settings';

const app = express();

app.use(cors());

app.get('/settings', (req, res) => {
  res.json(settings);
});

// app.get('/gate-changes/:search', (req, res) => {
//   const search = req.params.search;

//   const filteredGateChanges = gateChanges.filter((gc) => {
//     return gc.flightNumber.includes(search);
//   });

//   // Mimic network latency
//   setTimeout(() => {
//     res.json(filteredGateChanges);
//   }, Math.random() * 3000);
// });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
