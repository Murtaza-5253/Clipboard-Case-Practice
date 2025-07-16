# 📊 Most Active Workplaces API (Clipboard Health Case Study)

This project simulates a simplified backend system to fetch and rank the most active workplaces based on shift frequency, using mock shift data. Built with TypeScript, Node.js, Express, and documented with Swagger.

---

## 🔧 Tech Stack

- Node.js
- TypeScript
- Express.js
- Swagger (OpenAPI 3)
- JSON (mock data source)

---

## 🚀 API Endpoint

### `GET /workplaces`

Returns the top workplaces sorted by number of shifts in a given date range.

**Query Parameters:**

| Name       | Type   | Required | Example         |
|------------|--------|----------|-----------------|
| `startDate`| string | ✅       | `2024-06-01`    |
| `endDate`  | string | ✅       | `2024-06-07`    |


**Example Response:**
```json
[
  { "workplaceId": "W1", "count": 4 },
  { "workplaceId": "W2", "count": 3 },
  { "workplaceId": "W3", "count": 2 }
]

