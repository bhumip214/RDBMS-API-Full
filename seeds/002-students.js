exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { cohort_id: 1, name: "Mona" },
        { cohort_id: 1, name: "Sam" },
        { cohort_id: 2, name: "Erica" },
        { cohort_id: 2, name: "Mark" },
        { cohort_id: 3, name: "Sheela" },
        { cohort_id: 3, name: "John" }
      ]);
    });
};
