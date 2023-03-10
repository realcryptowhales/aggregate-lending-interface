import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
export function useOpenTradeDialog() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  function openTrade(props: any) {
    if (address) {
      window.aggregate.openDialog(props);
    } else {
      openConnectModal && openConnectModal();
    }
  }

  return openTrade;
}
