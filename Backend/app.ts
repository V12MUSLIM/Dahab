import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

// Stay API
app.get("/api/stay", (req, res) => {
  res.json({
    message: "Welcome to Stay in Dahab",
    accommodations: [
      {
        id: 1,
        name: "Sea View Hotel",
        description: "Beautiful beachfront hotel with stunning Red Sea views.",
        price: "$51",
        image: "http://localhost:3000/public/image1.jpeg",
      },
      {
        id: 2,
        name: "Desert Camp",
        description: "Adventure-style camping under the stars in the desert.",
        price: "$30",
        image: "http://localhost:3000/public/image2.jpeg",
      },
      {
        id: 3,
        name: "Mountain Lodge",
        description: "Peaceful mountain retreat with fresh air and hiking trails.",
        price: "$40",
        image: "http://localhost:3000/public/image3.jpeg",
      },
      {
        id: 4,
        name: "Blue Lagoon Bungalows",
        description: "Rustic bungalows right by Dahab’s famous Blue Lagoon.",
        price: "$45",
        image: "http://localhost:3000/public/image4.jpeg",
      },
      {
        id: 5,
        name: "Coral Reef Inn",
        description: "Cozy inn located steps away from prime diving spots.",
        price: "$55",
        image: "http://localhost:3000/public/image5.jpeg",
      },
    ],
  });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
