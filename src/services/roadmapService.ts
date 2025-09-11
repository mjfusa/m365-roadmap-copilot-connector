import axios from 'axios';
import { Config } from '../models/Config';
import { RoadmapItem } from '../models/RoadmapItem';

/**
 * Fetches and parses JSON data from the Microsoft 365 roadmap API
 * @param config - The configuration object
 * @param since - Optional date to filter items modified since this date
 * @returns Promise<RoadmapItem[]>
 */
export async function fetchRoadmapItems(config: Config, since?: Date): Promise<RoadmapItem[]> {
  try {
    config.context.log(`Fetching roadmap data from: ${config.connector.jsonApiUrl}`);
    const response = await axios.get(config.connector.jsonApiUrl);
    const items: RoadmapItem[] = response.data;

    if (!Array.isArray(items)) {
      throw new Error('API response is not an array');
    }

    config.context.log(`Found ${items.length} items in JSON API response`);
    
    return items.filter((item: RoadmapItem) => {
      if (!since) return true;
      const modifiedDate = new Date(item.modified);
      return modifiedDate >= since;
    });

  } catch (error) {
    config.context.error(`Error fetching JSON API data: ${error.message}`);
    throw error;
  }
}
