import { Dialog } from "@/components/ui/dialog";
import TokenListTrigger from "./token-list-trigger";
import TokenList from "./token-list";
import { Dispatch, SetStateAction, useState } from "react";

export default function TokenListWrapper({
  token,
  onSetToken,
}: {
  token: Token | undefined;
  onSetToken: Dispatch<SetStateAction<Token | undefined>>;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <TokenListTrigger token={token} />
      <TokenList onSetToken={onSetToken} onOpenDialog={setOpenDialog} />
    </Dialog>
  );
}
