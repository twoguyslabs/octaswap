import { Dialog } from "@/components/ui/dialog";
import TokenListTrigger from "./token-list-trigger";
import TokenList from "./token-list";
import { Dispatch, SetStateAction, useState } from "react";

export default function TokenListWrapper({
  token,
  onSetToken,
  elementRef,
}: {
  token: UnionToken | undefined;
  onSetToken: Dispatch<SetStateAction<UnionToken | undefined>>;
  elementRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenChange = (state: boolean) => {
    setOpenDialog(state);
    setSearchQuery("");
  };

  return (
    <Dialog open={openDialog} onOpenChange={(state) => handleOpenChange(state)}>
      <TokenListTrigger token={token} elementRef={elementRef} />
      <TokenList
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        onSetToken={onSetToken}
        onOpenDialog={setOpenDialog}
      />
    </Dialog>
  );
}
