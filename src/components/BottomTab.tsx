import Link from "next/link";
import React from "react";
import { AiOutlineEdit, AiOutlineMessage } from "react-icons/ai";

const BottomTab = () => {
  return (
    <div className="fixed bottom-0 flex w-full justify-between p-4">
      <div className="flex w-1/2 justify-center">
        <Link href="/grammar">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300/20">
            <AiOutlineEdit size={24} />
          </div>
        </Link>
      </div>
      <div className="flex w-1/2 justify-center">
        <Link href="/talk">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300/20">
            <AiOutlineMessage size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomTab;
