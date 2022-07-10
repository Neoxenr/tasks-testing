import { isPalindrome } from "../../code-example";

describe("String should be a palindrome", () => {
  it("Test 1", () => {
    const str: string = "11211";
    
    expect(isPalindrome(str)).toBeTruthy();
  })
  it("Test 2", () => {
    const str: string = "abcghgcba";

    expect(isPalindrome(str)).toBeTruthy();
  });
  it("Test 3", () => {
    const str: string = "";

    expect(isPalindrome(str)).toBeTruthy();
  });
});

describe("String shouldn't be a palindrome", () => {
  it("Test 1", () => {
    const str: string = "123456";

    expect(isPalindrome(str)).toBeFalsy();
  });
  it("Test 2", () => {
    const str: string = "abaaabbb";

    expect(isPalindrome(str)).toBeFalsy();
  });
  it("Test 3", () => {
    const str: string = "adsadadadaaaadaddad";

    expect(isPalindrome(str)).toBeFalsy();
  })
});