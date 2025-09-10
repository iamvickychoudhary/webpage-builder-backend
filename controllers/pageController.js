import Page from '../models/Page.js';

export const createPage = async (req, res) => {
  try {
    const { title, blocks } = req.body;
    const page = await Page.create({
      title: title || "Untitled Page",
      blocks: blocks || [],
      author: req.user._id,
    });
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ message: "Error creating page" });
  }
};

export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({ author: req.user._id }).sort({ updatedAt: -1 });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pages" });
  }
};

export const getPage = async (req, res) => {
  try {
    const page = await Page.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Error fetching page" });
  }
};

export const updatePage = async (req, res) => {
  try {
    const { blocks, isPublished } = req.body;

    const page = await Page.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!page) return res.status(404).json({ message: "Page not found" });

    if (blocks) page.blocks = blocks;
    if (typeof isPublished === "boolean") page.isPublished = isPublished;

    await page.save();
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Error updating page" });
  }
};
