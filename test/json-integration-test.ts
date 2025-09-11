/**
 * Test script to validate JSON API integration
 * Run with: npm run test:json
 */

import { initConfig } from "../src/config";
import { fetchRoadmapItems } from "../src/services/roadmapService";
import { getAllItemsFromAPI } from "../src/custom/getAllItemsFromAPI";
import { getExternalItemFromItem } from "../src/custom/getExternalItemFromItem";

// Mock InvocationContext for testing
const mockContext = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
  trace: console.trace,
  invocationId: 'test-invocation',
  functionName: 'test-function',
  extraInputs: new Map(),
  extraOutputs: new Map(),
  retryContext: {
    retryCount: 0,
    maxRetryCount: 0
  },
  traceContext: {
    traceparent: '',
    tracestate: ''
  },
  options: {
    trigger: {
      name: 'test'
    }
  }
} as any;

async function testJsonIntegration() {
  console.log("🧪 Testing JSON API Integration...\n");

  try {
    // Test 1: Configuration initialization
    console.log("1️⃣ Testing configuration initialization...");
    
    // Set required environment variables for testing
    process.env.AZURE_CLIENT_ID = "test-client-id";
    process.env.CONNECTOR_ID = "M365Roadmap";
    process.env.CONNECTOR_NAME = "M365 Roadmap";
    process.env.CONNECTOR_DESCRIPTION = "Connection that indexes Microsoft 365 roadmap items from JSON API.";
    process.env.JSON_API_URL = "https://www.microsoft.com/releasecommunications/api/v1/m365";
    
    const config = initConfig(mockContext);
    console.log("✅ Configuration initialized successfully");
    console.log(`   JSON API URL: ${config.connector.jsonApiUrl}`);
    console.log(`   Connector ID: ${config.connector.id}\n`);

    // Test 2: JSON API fetching
    console.log("2️⃣ Testing JSON API fetching...");
    const roadmapItems = await fetchRoadmapItems(config);
    console.log(`✅ Successfully fetched ${roadmapItems.length} roadmap items`);
    
    if (roadmapItems.length > 0) {
      const sampleItem = roadmapItems[0];
      console.log("   Sample roadmap item:");
      console.log(`   - Title: ${sampleItem.title}`);
      console.log(`   - Products: ${sampleItem.tagsContainer?.products?.map(p => p.tagName).join(", ") || "None"}`);
      console.log(`   - Status: ${sampleItem.status}`);
      console.log(`   - Release Phase: ${sampleItem.tagsContainer?.releasePhase?.map(p => p.tagName).join(", ") || "None"}\n`);
    }

    // Test 3: Item transformation pipeline
    console.log("3️⃣ Testing item transformation pipeline...");
    let itemCount = 0;
    for await (const item of getAllItemsFromAPI(config)) {
      itemCount++;
      if (itemCount === 1) {
        console.log("   Sample transformed item:");
        console.log(`   - ID: ${item.id}`);
        console.log(`   - Title: ${item.title}`);
        console.log(`   - Products: ${item.products.join(", ")}`);
        console.log(`   - URL: ${item.url}\n`);
        
        // Test 4: External item transformation
        console.log("4️⃣ Testing Graph API transformation...");
        const externalItem = getExternalItemFromItem(item);
        console.log("✅ Successfully created external item for Graph API");
        console.log(`   - Properties keys: ${Object.keys(externalItem.properties || {}).join(", ")}`);
        console.log(`   - Content type: ${externalItem.content?.type}`);
        console.log(`   - ACL configured: ${externalItem.acl ? "Yes" : "No"}\n`);
      }
      if (itemCount >= 3) break; // Test with first 3 items
    }
    
    console.log(`✅ Processed ${itemCount} items through the transformation pipeline\n`);

    // Test 5: Schema validation
    console.log("5️⃣ Testing schema compatibility...");
    const schema = config.connector.schema;
    const requiredFields = ['title', 'description', 'status', 'products', 'platforms', 'releasePhase'];
    const schemaFields = schema.properties?.map((p: any) => p.name) || [];
    
    const missingFields = requiredFields.filter(field => !schemaFields.includes(field));
    if (missingFields.length === 0) {
      console.log("✅ All required fields are present in schema");
    } else {
      console.log(`⚠️ Missing fields in schema: ${missingFields.join(", ")}`);
    }
    console.log(`   Schema fields: ${schemaFields.join(", ")}\n`);

    console.log("🎉 JSON API Integration Test Completed Successfully!");
    console.log("\n📋 Summary:");
    console.log(`   - Roadmap items fetched: ${roadmapItems.length}`);
    console.log(`   - Items transformed: ${itemCount}`);
    console.log(`   - Schema fields: ${schemaFields.length}`);
    console.log(`   - Configuration: ✅`);
    console.log(`   - JSON API parsing: ✅`);
    console.log(`   - Data transformation: ✅`);
    console.log(`   - Graph API format: ✅`);

  } catch (error) {
    console.error("❌ JSON API Integration Test Failed:");
    console.error(error);
    process.exit(1);
  }
}

// Run the test
testJsonIntegration();
