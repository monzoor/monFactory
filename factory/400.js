import { monFactory } from '../monFactory.js';

monFactory.create(
  {
    _key: "badRequest",
    noId: true,
  },
  () => ({
    statusCode: 400,
    message: "Missing required field: namaJawatan"
  })
); 