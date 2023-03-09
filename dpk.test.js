const { deterministicPartitionKey } = require("./dpk");
const { encryptCandidate } = require("./utils");

const generateBigString = () => Array(300).fill('test').join('-')

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hash from empty object when input is empty object", () => {
    const input = {};
    const trivialKey = deterministicPartitionKey(input);
    
    const expected = encryptCandidate(JSON.stringify(input));
    expect(trivialKey).toBe(expected);
  });

  it("Returns partitionKey when input have partitionKey as string", () => {
    const partitionKey = 'test';
    const input = { partitionKey };
    const trivialKey = deterministicPartitionKey(input);
    
    expect(trivialKey).toBe(partitionKey);
  });

  it("Returns partitionKey as string when input have partitionKey as integer", () => {
    const partitionKey = 5;
    const input = { partitionKey };
    const trivialKey = deterministicPartitionKey(input);
    
    expect(trivialKey).toBe(String(partitionKey));
  });

  it("Returns hash from input when input have partitionKey as null", () => {
    const partitionKey = null;
    const input = { partitionKey };
    const trivialKey = deterministicPartitionKey(input);
    const expected = encryptCandidate(JSON.stringify(input));
    
    expect(trivialKey).toBe(expected);
  });

  it("Returns hash from partitionKey when input have a string with more than 256 characters", () => {
    const partitionKey = generateBigString();
    const input = { partitionKey };
    const trivialKey = deterministicPartitionKey(input);

    const expected = encryptCandidate(partitionKey);
    
    expect(trivialKey).toBe(expected);
  });
});
