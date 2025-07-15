const Project = require("../models/Projects");
const { client } = require("../config/elastic");

exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();

    // ✅ Index to Elasticsearch
    await client.index({
      index: "projects",
      id: saved._id.toString(),
      document: {
        title: saved.title,
        description: saved.description,
        status: saved.status,
        createdAt: saved.createdAt,
      },
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
};

exports.searchProjects = async (req, res) => {
  const { query } = req.query;

  try {
    const { hits } = await client.search({
      index: "projects",
      query: {
        multi_match: {
          query,
          fields: ["title", "description"],
        },
      },
    });

    const results = hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));

    res.json(results);
  } catch (err) {
    console.error("Search Error:", err.meta?.body?.error || err.message);
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};