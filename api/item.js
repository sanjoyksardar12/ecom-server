const express = require('express');
const router = express.Router();

const ITEMS = new Map();
ITEMS.set(0, {
  id: 0,
  name: 'Bayaband Thong-Strap Flip-Flops',
  created_at: 1678043049335
});

ITEMS.set(1, {
  id: 1,
  name: 'Galaxy Comfort IDP Thong-Strap Flip-Flops',
  created_at: 1678043049335
});

ITEMS.set(2, {
  id: 2,
  name: 'Ondeck Thong-Strap Flip-Flops',
  created_at: 1678043049335
});

let NO_OF_ITEMS = 3;

router.post('/create', (req, res) => {
  const { name } = req.body;

  const itemDetail = {
    id: NO_OF_ITEMS++,
    name: name,
    created_at: Date.now()
  };

  ITEMS.set(itemDetail.id, itemDetail);
  res.status(200).send({
    success: true
  });
});

router.get('/list', (_req, res) => {
  res.status(200).send({
    items: [...ITEMS.values()].map((detail) => ({
      ...detail
    })),
    success: true
  });
});

module.exports = { router, ITEMS };
