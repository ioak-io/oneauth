import { httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';
// import { sendMessage } from '../../events/MessageService';

const createAsset = async (payload) => {
  const response = await httpPut(`${constants.API_URL_ASSET}`, payload, {});
  return response;
};

export default createAsset;
