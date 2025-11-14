import React, { useState } from "react";
import ArtistsYouFollow from "./artists-you-follow";
import CategorySelector from "./categorySelector";
import FeaturingToday from "./featuring-today";
import GreetingHeader from "./header";
import MixesForYou from "./mixes-for-you";
import NewRealeases from "./new-realeases";
import RecentlyPlayed from "./recently-played";
import RecommendedSongs from "./recommended-songs";
import TopPlaylists from "./top-playlists";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Dành cho bạn");

  const isForYou = activeCategory === "Dành cho bạn";
  const categoriesWithRecommended = [
    "Thư giãn",
    "Tập luyện",
    "Du lịch",
    "Tập trung",
    "Ngủ",
    "Di chuyển",
  ];
  const isRecommendedCategory =
    categoriesWithRecommended.includes(activeCategory);

  return (
    <>
      <GreetingHeader />

      <CategorySelector
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {isForYou && (
        <>
          <FeaturingToday />
          <RecentlyPlayed />
          <MixesForYou />
          <ArtistsYouFollow />
          <NewRealeases />
          <TopPlaylists />
        </>
      )}

      {isRecommendedCategory && <RecommendedSongs category={activeCategory} />}
    </>
  );
}
