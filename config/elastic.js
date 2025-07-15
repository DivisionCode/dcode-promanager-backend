const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ELASTIC_NODE,  // e.g., http://localhost:9200
  // No need to set headers manually
  // v8 client is compatible by default
});

const connectElastic = async () => {
  try {
    const health = await client.cluster.health();
    console.log("✅ Elasticsearch Connected:", health.status);
  } catch (err) {
    console.error("❌ Elasticsearch Connection Failed:", err.message);
  }
};

module.exports = {
  client,
  connectElastic
};