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

const parse = (record, fields) =>
  fields.reduce((map, field) => {
    map[field] = record.get(field);
    return map;
  }, {});

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const payload = [];
  // Read from table
  base("Schedule")
    .select()
    .eachPage(
      (records, next) => {
        records.forEach(rec => {
          payload.push(parse(rec, columns));
          console.log(rec);
        });
        next();
      },
      err => {
        if (err) console.error(err);
        else res.end(JSON.stringify(payload));
      }
    );
};
