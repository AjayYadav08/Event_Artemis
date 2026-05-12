import { EVENTS_MOCK } from './components/EventsPage';

const ids = EVENTS_MOCK.map(e => e.id);
const seen = new Set();
const duplicates = [];

for (const id of ids) {
  if (seen.has(id)) {
    duplicates.push(id);
  }
  seen.add(id);
}

if (duplicates.length > 0) {
  console.log('Duplicate IDs found in EVENTS_MOCK:', duplicates);
} else {
  console.log('No duplicate IDs found in EVENTS_MOCK.');
}
