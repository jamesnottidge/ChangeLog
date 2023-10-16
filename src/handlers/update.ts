import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Updates];
  }, []);
  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      belongsToId: req.user.id,
      id: req.body.productId,
    },
  });
  if (!product) {
    res.status(404);
    res.json({ message: "Product not found for user" });
    return;
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: product },
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const id = req.params.id;
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });
  const update = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  const match = update.find((update) => update.id === id);

  if (!match) {
    res.status(404);
    res.json({ message: "Update not found for user" });
    return;
  }

  const updated = await prisma.update.update({
    where: {
      id: id,
    },
    data: req.body,
  });
};

export const deleteUpdate = async (req, res) => {
  const id = req.params.id;
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });
  const update = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  const match = update.find((update) => update.id === id);

  if (!match) {
    res.status(404);
    res.json({ message: "Update not found for user" });
    return;
  }

  const deleted = await prisma.update.delete({
    where: {
      id: id,
    },
  });

  res.json({ data: deleted });
};
