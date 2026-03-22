"""Tests for utility functions."""

from utils import greet, is_palindrome


def test_greet():
    assert greet("World") == "Hello, World!"
    assert greet("Alice") == "Hello, Alice!"


def test_is_palindrome():
    assert is_palindrome("racecar") is True
    assert is_palindrome("A man, a plan, a canal: Panama") is True
    assert is_palindrome("hello") is False
    assert is_palindrome("") is True
    assert is_palindrome("Was it a car or a cat I saw?") is True
    assert is_palindrome("No lemon, no melon") is True


if __name__ == "__main__":
    test_greet()
    test_is_palindrome()
    print("All tests passed!")
