import BigNumber from 'bignumber.js';

export const getBalanceOfAddress = async (
  address: string,
  rpcUrl: string,
  _data?: any,
): Promise<string> => {
  let balance: BigNumber = new BigNumber(0);

  try {
    const data = await fetch(
      `${rpcUrl}chains/main/blocks/head/context/contracts/${address}/balance`,
    ).then((x) => x.json());
    balance = balance.plus(new BigNumber(data));
  } catch (error: any) {
    // if node returns 404 (which means 'no account found'), go with 0 balance
    if (error.response && error.response.status !== 404) {
      throw new Error('Error fetching balance');
    }
  }

  return balance.toString(10);
};
