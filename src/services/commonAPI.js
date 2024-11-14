import axios from 'axios';

const commonAPI = async (httpMethod, url, requestBody) => {
  const requestConfig = {
    method: httpMethod,
    url,
    data: requestBody
  };

  return await axios(requestConfig).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
};

export default commonAPI;
