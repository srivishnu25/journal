import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/ui/drawer";
import { Button } from "../button";
import { Analysis } from "@prisma/client";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { deleteEntry } from "@/app/lib/actions";

export default async function AnalysisDrawer(analysis: Analysis) {
  return (
    <Drawer>
      <DrawerTrigger className="fixed bottom-0">
        <ChevronUpIcon width={32} height={32} />
      </DrawerTrigger>
      <DrawerContent className="border-none shadow-[0_0_9px_1px_white] gap-10">
        <DrawerHeader className="space-y-3">
          <DrawerTitle
            className="capitalize flex items-center justify-center rounded-md h-16 text-xl"
            style={{ backgroundColor: analysis.color }}
          >
            {analysis.mood}
          </DrawerTitle>
          <div className="capitalize text-lg">{analysis.subject}</div>
          <DrawerDescription className="text-stone-400 text-left max-h-72 overflow-y-auto">
            {analysis.summary}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            onClick={async () => {
              "use server";
              await deleteEntry(analysis.entryId);
            }}
            className="bg-red-500 active:bg-red-400 hover:bg-red-400 justify-center"
          >
            Delete Journal
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
