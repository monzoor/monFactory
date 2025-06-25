import { monFactory } from '../monFactory.js';

monFactory.create(
  {
    _key: "postResponse",
    _dataKey: "data",
    noId: true,
  },
  () => ({
    // statusCode: 201,
    message: "Pengalaman kerja berjaya dicipta",
    data: {
      id: 4
    }
  })
); 