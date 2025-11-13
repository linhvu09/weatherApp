import React from "react";
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
  return (
    <>
      <GreetingHeader />
      <CategorySelector />
      <FeaturingToday />
      <RecentlyPlayed />
      <MixesForYou />
      <ArtistsYouFollow />
      <NewRealeases />
      <TopPlaylists />
      <RecommendedSongs />
    </>
  );
}
