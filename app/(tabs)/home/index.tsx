import React from "react";
import CategorySelector from "./categorySelector";
import GreetingHeader from "./header";

export default function HomeScreen() {
    return (
        <>
            <GreetingHeader />
            <CategorySelector />
        </>
    );
}
