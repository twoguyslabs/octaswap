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
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenChange = (state: boolean) => {
    setOpenDialog(state);
    setSearchQuery("");
  };

  return (
    <Dialog open={openDialog} onOpenChange={(state) => handleOpenChange(state)}>
      <TokenListTrigger token={token} />
      <TokenList
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        onSetToken={onSetToken}
        onOpenDialog={setOpenDialog}
      />
    </Dialog>
  );
}
