import { monFactory } from '../monFactory.js';

monFactory.create(
  {
    _key: "notFound",
    noId: true,
  },
  () => ({
    statusCode: 404,
    message: "Job experiences not found"
  })
); 