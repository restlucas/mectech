"use client";

import { getPathName } from "@/utils/getPathname";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function TopNavigation() {
  const pathname = usePathname();
  const result = getPathName(pathname);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="h-[83px] flex items-center justify-start">
        <p className="font-medium text-xs">{result}</p>
      </div>

      <div className="flex items-center justify-end gap-4 ">
        <Image alt="Mectech logo" src={"/MECTECH.svg"} height={19} width={84} />

        <button className="text-sm font-semibold bg-foreground-red py-1 px-2 text-white rounded-md flex items-center justify-center gap-1">
          <Image
            alt="Tasks icon"
            src={"/assets/top/tasks.svg"}
            width={13}
            height={13}
          />
          <span>Tarefas</span>
        </button>

        <button>
          <Image
            alt="Inbox icon"
            src={"/assets/top/inbox.svg"}
            width={16}
            height={16}
          />
        </button>
        <button>
          <Image
            alt="Info icon"
            src={"/assets/top/info.svg"}
            width={16}
            height={16}
          />
        </button>
        <button>
          <Image
            alt="Settings icon"
            src={"/assets/top/settings.svg"}
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
