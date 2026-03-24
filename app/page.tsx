"use client";

import { useMemo, useState } from "react";

type TabKey = "feed" | "write" | "team" | "my";

type FeedPost = {
  id: number;
  title: string;
  place: string;
  time: string;
  slots: string;
  type: "게스트 모집" | "구장 구함";
};

const feedPosts: FeedPost[] = [
  {
    id: 1,
    title: "강남 실내코트 3:3 게스트 모집",
    place: "강남 스포츠센터 A코트",
    time: "오늘 20:00 - 22:00",
    slots: "6명 중 2명 모집",
    type: "게스트 모집",
  },
  {
    id: 2,
    title: "주말 오전 경기 가능한 구장 구해요",
    place: "잠실/송파 인근",
    time: "토요일 09:00 - 11:00",
    slots: "팀 10명",
    type: "구장 구함",
  },
  {
    id: 3,
    title: "홍대 야간 5:5 게스트 3명 모집",
    place: "홍익대 체육관",
    time: "일요일 19:00 - 21:00",
    slots: "10명 중 3명 모집",
    type: "게스트 모집",
  },
];

const teamMembers = [
  { name: "김민수", role: "PG", number: 3 },
  { name: "이정훈", role: "SF", number: 11 },
  { name: "박성우", role: "C", number: 34 },
  { name: "최도윤", role: "SG", number: 7 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("feed");

  const tabTitle = useMemo(() => {
    if (activeTab === "feed") return "게스트/구장 모집";
    if (activeTab === "write") return "모집 글 작성";
    if (activeTab === "team") return "우리 팀";
    return "마이 페이지";
  }, [activeTab]);

  return (
    <main className="mobilePage">
      <section className="phoneFrame">
        <header className="appHeader">
          <p className="brand">Basketball Match</p>
          <h1>{tabTitle}</h1>
        </header>

        <section className="screenBody">
          {activeTab === "feed" && (
            <div className="feedList" aria-label="게스트 모집 및 구장 구하는 글">
              {feedPosts.map((post) => (
                <article className="postCard" key={post.id}>
                  <div className="postTop">
                    <h2>{post.title}</h2>
                    <span className={`badge ${post.type === "게스트 모집" ? "guest" : "court"}`}>
                      {post.type}
                    </span>
                  </div>
                  <dl>
                    <div>
                      <dt>장소</dt>
                      <dd>{post.place}</dd>
                    </div>
                    <div>
                      <dt>시간</dt>
                      <dd>{post.time}</dd>
                    </div>
                    <div>
                      <dt>인원</dt>
                      <dd>{post.slots}</dd>
                    </div>
                  </dl>
                  <button type="button">참여하기</button>
                </article>
              ))}
            </div>
          )}

          {activeTab === "write" && (
            <form className="writeForm" aria-label="모집 글 작성 폼">
              <label htmlFor="type">모집 유형</label>
              <select id="type" defaultValue="게스트 모집">
                <option>게스트 모집</option>
                <option>구장 구함</option>
              </select>

              <label htmlFor="place">장소</label>
              <input id="place" placeholder="예: 강남 스포츠센터" defaultValue="" />

              <label htmlFor="time">시간</label>
              <input id="time" placeholder="예: 오늘 20:00 - 22:00" defaultValue="" />

              <label htmlFor="count">구하는 인원수</label>
              <input id="count" placeholder="예: 10명 중 3명 모집" defaultValue="" />

              <label htmlFor="desc">상세 내용</label>
              <textarea id="desc" rows={4} placeholder="경기 레벨, 준비물 등" />

              <button type="button" className="primaryBtn">
                글 등록하기
              </button>
            </form>
          )}

          {activeTab === "team" && (
            <section className="teamPage" aria-label="팀 정보">
              <div className="teamCard">
                <div className="teamPhoto" aria-label="팀 사진">
                  🏀
                </div>
                <h2>TEAM FASTBREAK</h2>
                <p>강남 기반 · 주 2회 · 중급/상급 혼합</p>
              </div>

              <div className="memberCard">
                <h3>팀원 정보</h3>
                <ul>
                  {teamMembers.map((member) => (
                    <li key={member.number}>
                      <span>#{member.number}</span>
                      <strong>{member.name}</strong>
                      <em>{member.role}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {activeTab === "my" && (
            <section className="emptyPage" aria-label="마이 페이지">
              <p>마이 페이지는 추후 추가 예정입니다.</p>
            </section>
          )}
        </section>

        <nav className="bottomTabs" aria-label="하단 탭">
          <button
            type="button"
            className={activeTab === "feed" ? "active" : ""}
            onClick={() => setActiveTab("feed")}
          >
            모집글
          </button>
          <button
            type="button"
            className={activeTab === "write" ? "active" : ""}
            onClick={() => setActiveTab("write")}
          >
            작성
          </button>
          <button
            type="button"
            className={activeTab === "team" ? "active" : ""}
            onClick={() => setActiveTab("team")}
          >
            팀
          </button>
          <button
            type="button"
            className={activeTab === "my" ? "active" : ""}
            onClick={() => setActiveTab("my")}
          >
            마이
          </button>
        </nav>
      </section>
    </main>
  );
}
