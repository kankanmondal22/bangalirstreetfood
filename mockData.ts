export const packageData = [
  {
    id: "pkg1",
    title: "Kerala Backwaters",
    description:
      "Experience the serene beauty of Kerala's backwaters with a stay on a traditional houseboat. Enjoy local cuisine, guided village tours, and the tranquil waters.",
    duration: "3N/4D",
    pricePerAdult: 5000,
    pricePerChild: 3000,
    maxParticipants: 10,
    images: ["/pahar.jpeg"],
    highlights: ["Houseboat stay", "Local cuisine", "Guided village tour"],
    availableDates: ["2026-03-10", "2026-03-17", "2026-03-24"],
    minBookingAmount: 500,
    pickup: "Cochin International Airport",
    drop: "Cochin International Airport",
    itinerary: [
      {
        day: 1,
        activities:
          "Arrival at Cochin International Airport, transfer to houseboat, welcome drink, and sunset cruise with traditional Kerala dinner on board.",
      },
      {
        day: 2,
        activities:
          "Morning yoga session on the deck, breakfast on board, visit to local village and market, afternoon at leisure on the houseboat, sunset cruise, and traditional Kerala dinner.",
      },
    ],
  },

  {
    id: "pkg2",
    title: "2 Nights 3 Days – Rajasthan Desert Safari",
    description:
      "Embark on a thrilling desert safari in Rajasthan. Experience camel rides, desert camping under the stars, and vibrant cultural performances.",
    pricePerAdult: 6000,
    pricePerChild: 3500,
    duration: "2 Nights, 3 Days",
    maxParticipants: 8,
    images: ["/pahar2.jpeg"],
    highlights: ["Camel safari", "Desert camping", "Cultural performances"],
    availableDates: ["2026-03-12", "2026-03-19", "2026-03-26"],
    minBookingAmount: 1000,
    pickup: "Jaipur International Airport",
    drop: "Jaipur International Airport",
    itinerary: [
      {
        day: 1,
        activities:
          "Arrival at Jaipur International Airport, transfer to desert camp, evening camel safari, and traditional Rajasthani dinner under the stars.",
      },
      {
        day: 2,
        activities: "Morning camel safari through the dunes",
      },
      {
        day: 3,
        activities:
          "Sunrise camel ride, breakfast at the camp, and transfer back to Jaipur International Airport for departure.",
      },
    ],
  },
];

// Convert to CSV
// function convertToCSV(arr) {
//   const headers = Object.keys(arr[0]);
//   const csvRows = [
//     headers.join(","), // header row
//     ...arr.map(obj =>
//       headers.map(h => {
//         const val = obj[h];
//         if (Array.isArray(val)) {
//           return `"${val.join("; ")}"`; // join arrays with semicolon
//         }
//         return `"${val}"`;
//       }).join(",")
//     )
//   ];
//   return csvRows.join("\n");
// }

// const csv = convertToCSV(data);
// console.log(csv);
