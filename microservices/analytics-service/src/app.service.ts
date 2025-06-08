import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  private elasticsearchClient: Client;
  private redisClient: Redis;

  constructor() {
    this.elasticsearchClient = new Client({
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
    });
    
    this.redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  async trackEvent(eventData: any): Promise<any> {
    try {
      // Store in Elasticsearch for analytics
      const result = await this.elasticsearchClient.index({
        index: 'events',
        body: {
          ...eventData,
          timestamp: new Date(),
        },
      });

      // Cache recent events in Redis
      await this.redisClient.lpush('recent_events', JSON.stringify(eventData));
      await this.redisClient.ltrim('recent_events', 0, 99); // Keep last 100 events

      return { success: true, id: result._id };
    } catch (error) {
      console.error('Error tracking event:', error);
      return { success: false, error: error.message };
    }
  }

  async getReport(type: string, query: any): Promise<any> {
    try {
      const searchQuery = {
        index: 'events',
        body: {
          query: {
            bool: {
              must: [
                { term: { type } },
                ...(query.dateRange ? [{
                  range: {
                    timestamp: {
                      gte: query.dateRange.start,
                      lte: query.dateRange.end,
                    },
                  },
                }] : []),
              ],
            },
          },
          aggs: {
            counts: {
              date_histogram: {
                field: 'timestamp',
                calendar_interval: 'day',
              },
            },
          },
        },
      };

      const result = await this.elasticsearchClient.search(searchQuery);
      return {
        total: result.hits.total,
        data: result.hits.hits.map(hit => hit._source),
        aggregations: result.aggregations,
      };
    } catch (error) {
      console.error('Error getting report:', error);
      return { success: false, error: error.message };
    }
  }

  async getDashboardData(): Promise<any> {
    try {
      // Get cached dashboard data from Redis first
      const cached = await this.redisClient.get('dashboard_data');
      if (cached) {
        return JSON.parse(cached);
      }

      // Generate dashboard data from Elasticsearch
      const result = await this.elasticsearchClient.search({
        index: 'events',
        body: {
          size: 0,
          aggs: {
            event_types: {
              terms: {
                field: 'type.keyword',
              },
            },
            daily_events: {
              date_histogram: {
                field: 'timestamp',
                calendar_interval: 'day',
              },
            },
          },
        },
      });

      const dashboardData = {
        eventTypes: result.aggregations.event_types,
        dailyEvents: result.aggregations.daily_events,
        lastUpdated: new Date(),
      };

      // Cache for 5 minutes
      await this.redisClient.setex('dashboard_data', 300, JSON.stringify(dashboardData));

      return dashboardData;
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      return { success: false, error: error.message };
    }
  }

  getHello(): string {
    return 'Analytics Service is running!';
  }
} 