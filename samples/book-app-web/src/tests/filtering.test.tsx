import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it.each(["hobbit", "tolkien"])("returns the same results for case variants of %s", (searchTerm) => {
    const lowercaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm
    });
    const uppercaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: searchTerm.toUpperCase()
    });
    const mixedCaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: searchTerm === "hobbit" ? "HoBbIt" : "ToLkIeN"
    });

    expect(lowercaseResults.map((book) => book.title)).toEqual(["The Hobbit"]);
    expect(uppercaseResults).toEqual(lowercaseResults);
    expect(mixedCaseResults).toEqual(lowercaseResults);
  });

  it("ignores surrounding whitespace in searches", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "  HoBbIt  "
    });

    expect(results.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it.each(["", "   "])("returns all books for a blank search %j", (searchTerm) => {
    expect(filterBooks(books, { ...defaultFilters, searchTerm })).toEqual(books);
  });

  it("returns no books when the search does not match", () => {
    expect(filterBooks(books, { ...defaultFilters, searchTerm: "no matching book" })).toEqual([]);
  });

  it("combines case-insensitive search with genre and reading status", () => {
    const filters: BookFiltersState = {
      searchTerm: "HOBBIT",
      selectedGenre: "Fantasy",
      readingStatus: "read"
    };

    expect(filterBooks(books, filters).map((book) => book.title)).toEqual(["The Hobbit"]);
    expect(filterBooks(books, { ...filters, selectedGenre: "Mystery" })).toEqual([]);
    expect(filterBooks(books, { ...filters, readingStatus: "unread" })).toEqual([]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
