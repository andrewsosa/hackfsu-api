const { send } = require("micro");
const base = require("airtable").base("appc0VYcl3q4dlHmg");

const columns = [
  "Activity",
  "Date & Time",
  "Type",
  "Speaker(s)",
  "Topic/Theme",
  "Location",
  "Notes",
  "End Time"
];

// Simple func for extracting our column list and mapping it to a
// JSON object.
const parse = (record, fields) =>
  fields.reduce((map, field) => {
    map[field] = record.get(field);
    return map;
  }, {});

// Load the schedule using an async promise. By using a promise,
// we force the response to wait for our result.
const schedule = async () => {
  return new Promise(resolve => {
    const payload = [];
    // Read from table
    base("Schedule")
      .select()
      .eachPage(
        (records, next) => {
          records.forEach(rec => {
            payload.push(parse(rec, columns));
          });
          next();
        },
        err => {
          if (err) console.error(err);
          resolve(payload);
        }
      );
  });
};

module.exports = async (req, res) => {
  send(res, 200, await schedule());
};
