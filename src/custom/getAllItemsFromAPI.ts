import { Config } from "../models/Config";
import { Item } from "../models/Item";
import { fetchRoadmapItems } from "../services/roadmapService";

/**
 * Get all items from JSON API, yielding data as it becomes available.
 * @param config - The configuration object containing connector details
 * @param since - Optional date to filter items updated after this date
 */
export async function* getAllItemsFromAPI(
  config: Config,
  since?: Date
): AsyncGenerator<Item> {
  config.context.log(`Fetching items from JSON API: ${config.connector.jsonApiUrl}`);

  try {
    const roadmapItems = await fetchRoadmapItems(config, since);
    
    for (const roadmapItem of roadmapItems) {
      // Transform roadmap item to our internal Item format
      const item: Item = {
        id: roadmapItem.id?.toString() || '',
        title: roadmapItem.title || '',
        description: roadmapItem.description || '',
        moreInfoLink: roadmapItem.moreInfoLink || '',
        status: roadmapItem.status || roadmapItem.publicRoadmapStatus || 'Unknown',
        lastModified: roadmapItem.modified || '',
        created: roadmapItem.created || '',
        products: roadmapItem.tagsContainer?.products?.map(p => p.tagName) || [],
        platforms: roadmapItem.tagsContainer?.platforms?.map(p => p.tagName) || [],
        releasePhase: roadmapItem.tagsContainer?.releasePhase?.map(p => p.tagName) || [],
        cloudInstances: roadmapItem.tagsContainer?.cloudInstances?.map(p => p.tagName) || [],
        content: `${roadmapItem.title} - ${roadmapItem.description}`,
        url: roadmapItem.moreInfoLink || `https://www.microsoft.com/microsoft-365/roadmap?id=${roadmapItem.id}`,
        guid: roadmapItem.id?.toString() || ''
      };

      yield item;
    }
  } catch (error) {
    config.context.error(`Failed to fetch roadmap items: ${error.message}`);
    throw error;
  }
}
