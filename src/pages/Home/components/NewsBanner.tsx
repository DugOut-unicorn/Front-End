import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NewsBanner() {
  return (
    <div className="flex h-[526px] w-[789px] flex-1 flex-col items-start justify-end gap-2.5 self-stretch p-5">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="/images/newsbannerimg.png"
          alt="newsbanner"
          className="h-full w-full rounded-2xl object-cover"
        />
        <div className="absolute bottom-0 left-0 z-10 w-full p-8">
          <div className="t-h2 text-white">
            치열했던 KIA 5선발 경쟁, 탈락한 자의 품격... 이범호는 왜 말 한
            마디에 감동했나
          </div>
        </div>
      </div>
    </div>
  );
}
