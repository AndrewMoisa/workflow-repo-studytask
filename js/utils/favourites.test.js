import { expect, describe, it, beforeEach } from "vitest";
import { isFavourite, toggleFavourite } from "./favourites.js";

const FAVOURITES_KEY = "favourites";

beforeEach(() => {
  // Create a simple object to store our data
  const storage = {};

  // Create mock versions of the localStorage methods we need
  global.localStorage = {
    setItem: (key, value) => (storage[key] = value),
    getItem: (key) => storage[key],
  };
});

describe("isFavourite", () => {
  it("should return false if no favourites are stored", () => {
    expect(isFavourite(1)).toBe(false);
  });

  it("should return true if the article is a favourite", () => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([{ id: 1 }]));
    expect(isFavourite(1)).toBe(true);
  });

  it("should return false if the article is not a favourite", () => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([{ id: 2 }]));
    expect(isFavourite(1)).toBe(false);
  });
});

describe("toggleFavourite", () => {
  it("should add an article to favourites if it's not already a favourite", () => {
    const article = { id: 1, title: "Test Article" };
    toggleFavourite(1, article);
    expect(localStorage.getItem(FAVOURITES_KEY)).toBe(
      JSON.stringify([article]),
    );
  });

  it("should remove an article from favourites if it's already a favourite", () => {
    const article = { id: 1, title: "Test Article" };
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([article]));
    toggleFavourite(1, article);
    expect(localStorage.getItem(FAVOURITES_KEY)).toBe(JSON.stringify([]));
  });
});
