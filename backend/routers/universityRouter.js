const express = require("express");
const router = express.Router();
const University = require("../models/universitySchema");

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

router.get("/getalluniversities", async (req, res) => {
  try {
    const universities = await University.find();
    res.send(universities);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/hello", async (req, res) => {
  console.log(req.data)
  res.send();
});

router.get('/getuniversity/:universityEmail', async (req, res) => {
  const universityEmail = req.params.universityEmail;

  try {
    const university = await University.findOne({ email: universityEmail });
    if (university) {
      res.json(university);
    } else {
      res.status(404).json({ error: 'University not found' });
    }
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/register", async (req, res) => {
  const lineItem = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Hello",
        },
        unit_amount: req.body.items[0].amount * 100,
      },
      quantity: 1,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItem,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
      console.log(error);
      return res.status(400).json(error);
  }
});

router.post("/registeruni", async (req, res) => {
  try {
    const existingUniversity = await University.findOne({ uniId: req.body.uniId });

    if (existingUniversity) {
      return res.json({ error: 1 });
    } else {
      const newUniversity = new University(req.body);
      await newUniversity.save();
      return res.json({ error: 0 });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: error.message });
  }
})

router.post("/edit", async (req, res) => {
  try {
    const university = await University.findOne({ email: req.body.email });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    university.uniId = req.body.uniId;
    university.email = req.body.email;
    university.name = req.body.name;
    university.location = {
      locId: req.body.location.locId,
      city: req.body.location.city,
      state: req.body.location.state,
      postalCode: req.body.location.postalCode,
    };
    university.logo = req.body.logo;
    university.websiteURL = req.body.websiteURL;
    university.docxFile = req.body.docxFile;

    await university.save();

    res.json({ message: "University profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
