const tasks = [
  {
    id: "46f53b28-8779-4454-b9e4-18fee5c46e4T",
    patientID: "46f53b28-8779-4454-b9e4-18fee5c46e4b",
    title: "Run 1 mile",
    groupId: "exercise",
    schedule: {
      timesPerDay: 2,
      days: 62, //binary. all days except for sunday and saturday
      timeRange: {
        start: "07:30",
        end: "08:30",
      },
    },
    instructions: {
      //optional
      description: "Run a mile in under 14 minutes.",
      recommendations: "Run at 6 mph for most of the run.",
      warnings: "Make sure to drink water.",
    },
    datesCompleted: ["1597097790585"],
  },
  {
    id: "9474ae6b-0d37-4bec-8fe3-3d83c2f407fT",
    patientID: "9474ae6b-0d37-4bec-8fe3-3d83c2f407f9",
    title: "Run 1 mile",
    groupId: "exercise",
    schedule: {
      timesPerDay: 1,
      days: 62, //binary. all days except for sunday and saturday
      timeRange: {
        start: "02:30",
        end: "03:30",
      },
    },
    instructions: {
      //optional
      description: "Run a mile in under 14 minutes.",
      recommendations: "Run at 6 mph for most of the run.",
      warnings: "Make sure to drink water.",
    },
    datesCompleted: ["1597097790585"],
  },
];

export default tasks;
