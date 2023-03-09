const { encryptCandidate } = require("./utils");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }
  if (event?.partitionKey && event?.partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    return encryptCandidate(event.partitionKey);
  }

  const candidate = event?.partitionKey ? event.partitionKey : encryptCandidate(JSON.stringify(event));

  return typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;
};