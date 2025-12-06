"use client";

import { RefreshCw, ListFilter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EmptyInbox from "@/components/EmptyInbox";
import CountBubble from "@/components/CountBubble";

/* --------------------- DUMMY CONTENT (15 ITEMS EACH) --------------------- */

const last24Hours: any[] = Array.from({ length: 15 }).map((_, i) => ({
  badgeText: i % 2 === 0 ? "AI" : "BfM",
  badgeColor: i % 2 === 0 ? "#E0F2FE" : "#FEF3C7",
  badgeTextColor: i % 2 === 0 ? "#0369A1" : "#B45309",
  author: i % 2 === 0 ? "ByteByteGo Newsletter" : "Built for Mars",
  title: `24h Article Title ${i + 1}`,
  description:
    "This is a demo description for the inbox card. It helps test the view more interaction...",
  date: "Oct 3rd",
  time: "2 mins",
  tag: i % 2 === 0 ? "Software" : "Design",
  thumbnail: "/logos/forbes-sample.png",
}));

const last7Days: any[] = Array.from({ length: 15 }).map((_, i) => ({
  badgeText: i % 2 === 0 ? "AI" : "BfM",
  badgeColor: i % 2 === 0 ? "#E0F2FE" : "#FEF3C7",
  badgeTextColor: i % 2 === 0 ? "#0369A1" : "#B45309",
  author: i % 2 === 0 ? "ByteByteGo Newsletter" : "Built for Mars",
  title: `Past Week Article ${i + 1}`,
  description:
    "This article summary is here to test the extended pagination button behavior...",
  date: "Sept 28",
  time: "3 mins",
  tag: i % 2 === 0 ? "Tech" : "UX",
  thumbnail: "/logos/sample-img.png",
}));

/* --------------------- PAGINATION CONSTANTS --------------------- */
const INITIAL_VISIBLE = 2;
const FIRST_EXPAND_TO = 10;
const LOAD_MORE = 5;

/* ---------------------------------------------------------------- */

export default function InboxPage() {
  const [tab, setTab] = useState<"unread" | "read" | "all">("unread");
  const unreadCount = 12;

  const [visible24, setVisible24] = useState(INITIAL_VISIBLE);
  const [visible7, setVisible7] = useState(INITIAL_VISIBLE);

  /* ---- Pagination Logic ---- */
  const loadMore24 = () => {
    setVisible24((prev) => {
      if (prev === INITIAL_VISIBLE) {
        return Math.min(FIRST_EXPAND_TO, last24Hours.length);
      }
      return Math.min(prev + LOAD_MORE, last24Hours.length);
    });
  };

  const loadMore7 = () => {
    setVisible7((prev) => {
      if (prev === INITIAL_VISIBLE) {
        return Math.min(FIRST_EXPAND_TO, last7Days.length);
      }
      return Math.min(prev + LOAD_MORE, last7Days.length);
    });
  };

  const showMore24 = visible24 < last24Hours.length;
  const showMore7 = visible7 < last7Days.length;

  return (
    <div className="w-full flex flex-col gap-8">

      {/* HEADER */}
      <div className="w-full">
        <div
          className="
            w-full h-[78px] bg-white
            border border-[#E5E7E8]
            flex items-center justify-between
            px-5 shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <h2 className="text-[26px] font-bold text-[#0C1014]">Your Reads</h2>
            <RefreshCw size={20} className="text-[#0C1014] cursor-pointer" />
          </div>

          <div className="flex items-center gap-3 px-4 shrink-0">
            <button
              className="
                flex items-center gap-2 px-4 py-2
                bg-[#F6F7F8] border border-[#DFE2E6]
                rounded-xl hover:bg-white transition
              "
            >
              <ListFilter size={16} />
              <span className="text-[14px] font-medium">Filter</span>
            </button>

            <div className="flex items-center bg-[#F6F7F8] rounded-full p-1 h-[44px]">
              {[{ id: "unread", label: (
                <div className="flex items-center gap-2">
                  <span>Unread</span>
                  <CountBubble count={unreadCount} />
                </div>
              )
              },{
                id: "read", label: "Read"
              },{
                id: "all", label: "All"
              }].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id as any)}
                  className={`
                    px-4 h-full flex items-center rounded-full
                    text-sm font-medium transition
                    ${
                      tab === item.id
                        ? "bg-white text-[#0C1014] shadow-sm"
                        : "text-[#6F7680]"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full flex flex-col gap-10 mt-6 px-6">

        {/* LAST 24 HOURS */}
        {last24Hours.length>0 &&(
          <section>
                    <h3 className="text-[18px] font-semibold text-[#6F7680] mb-4">
                      Last 24 hours
                    </h3>

                    {last24Hours.slice(0, visible24).map((item, i) => (
                      <InboxCard key={i} {...item} />
                    ))}

                    {showMore24 && <CenterButton onClick={loadMore24} />}
          </section>
        )}
        

        {/* LAST 7 DAYS */}
        {last7Days.length>0 &&(
          <section>
          <h3 className="text-[18px] font-semibold text-[#6F7680] mb-4">
            Last 7 days
          </h3>

          {last7Days.slice(0, visible7).map((item, i) => (
            <InboxCard key={i} {...item} />
          ))}

          {showMore7 && <CenterButton onClick={loadMore7} />}
          </section>
        )}
        <EmptyInbox/>
      </div>
    </div>
  );
}

/* ---------------- "View more" BUTTON ---------------- */
function CenterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        mx-auto mt-4 block
        px-6 py-2
        border border-gray-300
        rounded-full
        text-black  font-medium
        hover:bg-white
        transition
      "
    >
      View more
    </button>
  );
}

/* ---------------- CARD COMPONENT ---------------- */
function InboxCard({
  badgeText,
  badgeColor,
  badgeTextColor,
  author,
  title,
  description,
  date,
  tag,
  time,
  thumbnail,
}: any) {
  return (
    <div
      className="
        bg-white
        border border-[#E5E7EB]
        rounded-2xl
        p-4
        flex justify-between items-start
        shadow-sm
        mb-3
      "
    >
      <div className="flex flex-col gap-2 max-w-[75%]">
        <div className="flex items-center gap-2">
          <div
            className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: badgeColor }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: badgeTextColor }}
            >
              {badgeText}
            </span>
          </div>
          <span className="text-[13px] text-[#6F7680]">{author}</span>
        </div>

        <h2 className="text-[18px] font-semibold text-[#0C1014]">{title}</h2>

        <p className="text-[14px] text-[#6F7680]">{description}</p>

        <div className="flex items-center gap-4 mt-1">
          <span className="text-[13px] text-[#6F7680]">{date}</span>
          <span className="px-3 py-1 bg-[#F3F4F6] rounded-full text-[13px]">
            {tag}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-[13px] text-[#6F7680]">{time}</span>

        <Image
          src={thumbnail}
          alt=""
          width={82}
          height={54}
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
