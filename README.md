# monFactory

## Overview

monFactory is a mock data factory system for generating structured mock data for use with [json-server](https://github.com/typicode/json-server). It allows you to define data templates in the `factory/` directory and automatically generates JSON files in the `db/` directory, which are then merged into a single `db.json` for serving mock APIs.

## How to Use

### 1. Install Dependencies

```
yarn install
```

### 2. Generate Mock Data

Run the following command to generate all mock data files in the `db/` directory and merge them into `db.json`:

```
yarn monFactory:run
```

### 3. Start the Mock API Server

To start the mock API server using json-server (after generating the data):

```
yarn start:json-server
```

This will:

- Generate the latest mock data
- Start json-server at [http://localhost:3000](http://localhost:3000) using the generated `db.json`

### 4. Watch for Changes (Development)

To automatically regenerate data and restart the server when you change any factory files:

```
yarn watch:factory
```

## Factory Files

The following factory files are available (excluding `company.js` and `user.js`):

- `400.js` — Generates a bad request response
- `404.js` — Generates a not found response
- `kompetensi.js` — Generates a single kompetensi record
- `kompetensiAll.js` — Generates a paginated list of kompetensi records
- `postResponse.js` — Generates a response for successful post actions

Each factory file defines a template for mock data and writes the result to the `db/` directory.

## Checking Responses in the db Folder

After running the factory, the generated responses can be found in the `db/` directory. Here are some examples:

- **Bad Request** (`db/badRequest.json`):
  ```json
  {
    "statusCode": 400,
    "message": "Pengesahan gagal",
    "error": {
      "kata laluan": "diperlukan"
    }
  }
  ```
- **Not Found** (`db/notFound.json`):
  ```json
  {
    "statusCode": 404,
    "message": "Pengalaman kerja tidak dijumpai"
  }
  ```
- **Kompetensi** (`db/kompetensi.json`):
  ```json
  {
    "data": { ... }
  }
  ```
- **Kompetensi All** (`db/kompetensiAll.json`):
  ```json
  {
    "data": [ ... ],
    "pageMeta": {
      "pageNumber": 1,
      "totalPages": 5,
      "totalCount": 250,
      "hasPreviousPage": false,
      "hasNextPage": true,
      "pageSize": 50
    }
  }
  ```
- **Post Response** (`db/postResponse.json`):
  ```json
  {
    "data": {
      "message": "Pengalaman kerja berjaya dicipta",
      "data": {
        "id": 4
      }
    }
  }
  ```

## Notes

- The `db/` folder is auto-generated. Do not edit files in `db/` manually.
- Only factory files (except `company.js` and `user.js`) are documented here as requested.
- The merged `db.json` is used by json-server and contains all generated data.

---

For more details, see the code in the `factory/`, `core/`, and `utils/` directories.
