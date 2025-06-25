import { monFactory } from '../monFactory.js';

monFactory.create(
  {
    _key: "notFound",
    _dataKey: "data",
    noId: true,
  },
  () => ({
    statusCode: 404,
    message: "Pengalaman kerja tidak dijumpai"
  })
); 