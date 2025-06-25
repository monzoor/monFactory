import { monFactory } from '../monFactory.js';

monFactory.create(
  {
    _key: "postSubmit",
    noId: true,
  },
  () => ({
    statusCode: 201,
    message: "Job experience created successfully",
    items: {
      id: 4
    }
  })
); 